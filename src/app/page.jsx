"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.conteudo}>
        {/* Badge topo */}
        <div className={styles.badgeTop} aria-label="Status da plataforma">
          <span className={styles.badgeDot} aria-hidden="true" />
          Plataforma de Aprendizado em Mapas
        </div>

        {/* Hero */}
        <header>
          <h1>🗺️ Sistema de Mapas Profissional</h1>
          <p className="lead">
            Domine geolocalização e roteamento com uma coleção de módulos práticos e
            progressivos. Recursos modernos, exemplos claros e foco em aplicações reais.
          </p>
        </header>

        {/* Ações principais */}
        <div className={styles.actions} role="group" aria-label="Ações rápidas">
          <Link href="#modulos" className={styles.btnPrimary} aria-label="Ver módulos disponíveis">
            <span>Ver módulos</span>
          </Link>
          <Link
            href="https://www.mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
            aria-label="Abrir site da Mapbox em nova aba"
          >
            Docs Mapbox ↗
          </Link>
        </div>

        {/* Cards de módulos */}
        <section id="modulos" aria-labelledby="titulo-modulos">
          <h2 id="titulo-modulos" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", clipPath: "inset(50%)" }}>
            Lista de Módulos
          </h2>
          <div className={styles.cards}>
            <Link href="/page1" className={styles.card} aria-label="Ir para módulo Geolocalização nível 1">
              <div className={styles.icone} aria-hidden="true">📍</div>
              <h2>Geolocalização</h2>
              <p>Descubra e manipule a posição atual do usuário com precisão e segurança.</p>
              <div className={styles.metaRow}>
                <span className={styles.nivel}>Nível 1</span>
                <span className={styles.linkSeta} aria-hidden="true">→</span>
              </div>
            </Link>

            <Link href="/page2" className={styles.card} aria-label="Ir para módulo Traçar Rota nível 2">
              <div className={styles.icone} aria-hidden="true">🚗</div>
              <h2>Traçar Rota</h2>
              <p>Busque destinos, calcule rotas otimizadas e visualize métricas detalhadas.</p>
              <div className={styles.metaRow}>
                <span className={styles.nivel}>Nível 2</span>
                <span className={styles.linkSeta} aria-hidden="true">→</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Footer */}
        <section className={styles.footerCTA} aria-labelledby="cta-title">
          <h2 id="cta-title">Avance para recursos avançados</h2>
          <p>
            Em breve: camadas temáticas, heatmaps, clustering dinâmico e integração com dados externos
            em tempo real. Prepare seu fluxo de trabalho e antecipe-se construindo bases sólidas.
          </p>
          <div className={styles.actions}>
            <Link href="/page1" className={styles.btnPrimary} aria-label="Começar agora pelo nível 1">
              Começar agora
            </Link>
            <Link href="mailto:contato@exemplo.com" className={styles.btnSecondary} aria-label="Entrar em contato por e-mail">
              Contato
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
