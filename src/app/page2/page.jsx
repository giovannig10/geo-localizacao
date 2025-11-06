"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page2.module.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function TracarRota() {
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [rotaInfo, setRotaInfo] = useState(null);
    const mapaRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        // Carrega o CSS do Mapbox
        const link = document.createElement("link");
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Carrega o JavaScript do Mapbox
        const script = document.createElement("script");
        script.src = "https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js";
        script.onload = () => {
            // Inicializa o mapa centrado no Brasil
            mapboxgl.accessToken = TOKEN;
            const map = new mapboxgl.Map({
                container: mapaRef.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [-46.6333, -23.5505], // São Paulo
                zoom: 12,
            });

            mapInstanceRef.current = map;
        };
        document.body.appendChild(script);
    }, []);

    // Função para geocodificar um endereço (converter endereço em coordenadas)
    const geocodificar = async (endereco) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            endereco
        )}.json?access_token=${TOKEN}&limit=1`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            return data.features[0].center; // Retorna [longitude, latitude]
        }
        return null;
    };

    // Função para traçar a rota entre origem e destino
    const tracarRota = async () => {
        if (!origem || !destino) {
            alert("Por favor, preencha origem e destino");
            return;
        }

        try {
            // Geocodifica origem e destino
            const coordOrigem = await geocodificar(origem);
            const coordDestino = await geocodificar(destino);

            if (!coordOrigem || !coordDestino) {
                alert("Não foi possível encontrar um ou mais endereços");
                return;
            }

            // Busca a rota usando Mapbox Directions API
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordOrigem[0]},${coordOrigem[1]};${coordDestino[0]},${coordDestino[1]}?geometries=geojson&access_token=${TOKEN}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const rota = data.routes[0];
                const distanciaKm = (rota.distance / 1000).toFixed(2);
                const duracaoMin = (rota.duration / 60).toFixed(0);

                setRotaInfo({
                    distancia: distanciaKm,
                    duracao: duracaoMin,
                });

                const map = mapInstanceRef.current;

                // Remove camadas e fontes anteriores se existirem
                if (map.getLayer("rota")) map.removeLayer("rota");
                if (map.getSource("rota")) map.removeSource("rota");
                if (map.getLayer("marcador-origem")) map.removeLayer("marcador-origem");
                if (map.getSource("marcador-origem")) map.removeSource("marcador-origem");
                if (map.getLayer("marcador-destino")) map.removeLayer("marcador-destino");
                if (map.getSource("marcador-destino")) map.removeSource("marcador-destino");

                // Adiciona a rota ao mapa
                map.addSource("rota", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: rota.geometry,
                    },
                });

                map.addLayer({
                    id: "rota",
                    type: "line",
                    source: "rota",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "#3b82f6",
                        "line-width": 5,
                        "line-opacity": 0.8,
                    },
                });

                // Adiciona marcador de origem (verde)
                map.addSource("marcador-origem", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: coordOrigem,
                                },
                            },
                        ],
                    },
                });

                map.addLayer({
                    id: "marcador-origem",
                    type: "circle",
                    source: "marcador-origem",
                    paint: {
                        "circle-radius": 10,
                        "circle-color": "#22c55e",
                        "circle-stroke-width": 2,
                        "circle-stroke-color": "#ffffff",
                    },
                });

                // Adiciona marcador de destino (vermelho)
                map.addSource("marcador-destino", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: coordDestino,
                                },
                            },
                        ],
                    },
                });

                map.addLayer({
                    id: "marcador-destino",
                    type: "circle",
                    source: "marcador-destino",
                    paint: {
                        "circle-radius": 10,
                        "circle-color": "#ef4444",
                        "circle-stroke-width": 2,
                        "circle-stroke-color": "#ffffff",
                    },
                });

                // Ajusta o mapa para mostrar toda a rota
                const coordinates = rota.geometry.coordinates;
                const bounds = coordinates.reduce(
                    (bounds, coord) => bounds.extend(coord),
                    new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
                );

                map.fitBounds(bounds, {
                    padding: 100,
                });
            }
        } catch (error) {
            console.error("Erro ao traçar rota:", error);
            alert("Erro ao traçar rota. Verifique os endereços.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.painel}>
                <h1>🚗 Traçar Rota</h1>
                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>📍 Origem</label>
                        <input
                            type="text"
                            value={origem}
                            onChange={(e) => setOrigem(e.target.value)}
                            placeholder="Ex: Av. Paulista, São Paulo"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>🎯 Destino</label>
                        <input
                            type="text"
                            value={destino}
                            onChange={(e) => setDestino(e.target.value)}
                            placeholder="Ex: Aeroporto de Guarulhos"
                            className={styles.input}
                        />
                    </div>

                    <button onClick={tracarRota} className={styles.botao}>
                        Calcular Rota
                    </button>
                </div>

                {rotaInfo && (
                    <div className={styles.info}>
                        <h3>📊 Informações da Rota</h3>
                        <p>
                            <strong>Distância:</strong> {rotaInfo.distancia} km
                        </p>
                        <p>
                            <strong>Duração estimada:</strong> {rotaInfo.duracao} min
                        </p>
                    </div>
                )}
            </div>

            <div ref={mapaRef} className={styles.mapa} />
        </div>
    );
}
