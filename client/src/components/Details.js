import {
  Sparkles,
  Music2,
  Disc3,
  ListMusic,
  Radio,
  Headphones,
  PlayCircle,
  Zap,
  Brain,
  MessageCircle,
  RefreshCw,
  Search,
  Mic2,
  ArrowUpRight
} from "lucide-react";

import "./Details.css";

import Sidebar from "./cards/Sidebar";

const FEATURES = [
  {
    id: 1,
    icon: Sparkles,
    title: "AI Music Assistant",
    shortDescription: "Create playlists using natural language.",
    details:
      "Describe your mood, activity, or music preferences. The AI interprets your request and generates a personalized selection of tracks.",
    category: "AI EXPERIENCE",
    color: "#8b7cff"
  },
  {
    id: 2,
    icon: Brain,
    title: "LLM-Powered Recommendations",
    shortDescription: "Turn natural language into music decisions.",
    details:
      "Use an LLM to understand contextual requests such as energetic playlists, relaxing music, or music for a road trip.",
    category: "ARTIFICIAL INTELLIGENCE",
    color: "#4db6ac"
  },
  {
    id: 3,
    icon: Zap,
    title: "MCP Integration",
    shortDescription: "Connect AI reasoning with external tools.",
    details:
      "The Model Context Protocol layer enables the assistant to interact with music-related tools, including track identification and retrieval.",
    category: "MCP",
    color: "#f3a95f"
  },
  {
    id: 4,
    icon: ListMusic,
    title: "AI Playlist Creation",
    shortDescription: "Generate playlists from simple prompts.",
    details:
      "Provide a prompt and let the application process song suggestions, identify tracks, and prepare a playlist through the Spotify API.",
    category: "PLAYLISTS",
    color: "#78a6ff"
  },
  {
    id: 5,
    icon: Search,
    title: "Smart Track Identification",
    shortDescription: "Find Spotify tracks from AI suggestions.",
    details:
      "The MCP server processes song and artist information and retrieves Spotify track identifiers for playlist operations.",
    category: "MUSIC DISCOVERY",
    color: "#d98aff"
  },
  {
    id: 6,
    icon: Radio,
    title: "Spotify Queue",
    shortDescription: "Explore and manage your current queue.",
    details:
      "View your music queue and interact with the currently playing track through the integrated music experience.",
    category: "PLAYBACK",
    color: "#6bc7a5"
  },
  {
    id: 7,
    icon: Headphones,
    title: "Integrated Music Player",
    shortDescription: "Listen without leaving the application.",
    details:
      "Use an embedded Spotify playback interface to control your music while exploring playlists and interacting with the assistant.",
    category: "PLAYBACK",
    color: "#ef9ab5"
  },
  // {
  //   id: 8,
  //   icon: MessageCircle,
  //   title: "Conversational Interaction",
  //   shortDescription: "Interact with music using natural language.",
  //   details:
  //     "Build a conversational experience where users can express preferences, refine their requests, and explore different music options.",
  //   category: "USER EXPERIENCE",
  //   color: "#8aa8ff"
  // },
  {
    id: 9,
    icon: RefreshCw,
    title: "Context-Aware Requests",
    shortDescription: "Build on previous music preferences.",
    details:
      "Support follow-up interactions that can be used to refine recommendations and evolve playlist-generation workflows.",
    category: "AI WORKFLOW",
    color: "#e5b76b"
  },
  {
    id: 10,
    icon: PlayCircle,
    title: "Spotify API Integration",
    shortDescription: "Connect application workflows with Spotify.",
    details:
      "Use Spotify authentication and API capabilities to work with user music data, playlists, and track information.",
    category: "INTEGRATION",
    color: "#70c9b4"
  },
  // {
  //   id: 11,
  //   icon: Mic2,
  //   title: "Voice AI Exploration",
  //   shortDescription: "Explore conversational voice experiences.",
  //   details:
  //     "Extend the project toward voice-driven music interactions and experiment with speech and conversational AI technologies.",
  //   category: "EXPERIMENTATION",
  //   color: "#c09aff"
  // },
  {
    id: 12,
    icon: Disc3,
    title: "Personalized Music Discovery",
    shortDescription: "Explore music beyond individual tracks.",
    details:
      "Combine AI-generated suggestions with Spotify's music catalog to discover songs based on themes, moods, and activities.",
    category: "DISCOVERY",
    color: "#e69b8d"
  }
];

function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <article
      className="feature-card"
      style={{
        "--feature-color": feature.color
      }}
    >
      <div className="feature-card-top">
        <span className="feature-index">
          {String(feature.id).padStart(2, "0")}
        </span>

        <div className="feature-icon">
          <Icon size={22} strokeWidth={1.6} />
        </div>

        <ArrowUpRight
          className="feature-arrow"
          size={20}
          strokeWidth={1.6}
        />
      </div>

      <div className="feature-card-content">
        <span className="feature-category">
          {feature.category}
        </span>

        <h3>{feature.title}</h3>

        <p className="feature-short-description">
          {feature.shortDescription}
        </p>
      </div>

      <div className="feature-hover-content">
        {/* <span className="feature-hover-label">
          EXPLORE FEATURE
        </span> */}

        <p>{feature.details}</p>

        <div className="feature-hover-line">
          <span />
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="feature-glow" />
    </article>
  );
}

export default function FeaturesPage({setPage}) {
  return (
    <div className='' style={{height:"100%", width:"100%", display:"flex", flexDirection:"row", }}>
                <div className='m-1 sticky-left' style={{ width:"95px", display:"flex", flexDirection:"row", overflow:"hidden",}}>
                    <Sidebar setPage={setPage}/>
                </div>
    <section className="features-page">
      <div className="features-container">

        {/* HEADER */}
        <div className="features-header">

          <div className="features-header-left">
            <span className="features-eyebrow">
              <span className="eyebrow-dot" />
              MUSIC-THING / FEATURES
            </span>

            {/* <h1>
              Music,
              <br />
              <span>Reimagined.</span>
            </h1> */}
          </div>

          {/* <div className="features-header-right">
            <p>
              An AI-powered music experience that combines
              natural language, intelligent workflows, and
              Spotify integrations.
            </p>

            <div className="features-header-meta">
              <span>AI + MCP</span>
              <span>•</span>
              <span>SPOTIFY</span>
              <span>•</span>
              <span>INTERACTIVE</span>
            </div>
          </div> */}

        </div>

        {/* INTRODUCTION */}
        {/* <div className="features-intro">

          <div className="intro-number">
            01
          </div>

          <div className="intro-content">
            <span className="intro-label">
              WHAT'S INSIDE
            </span>

            <h2>
              More than a music player.
            </h2>

            <p>
              Explore the features behind an AI-driven music
              application designed to connect conversational
              intelligence with real-world music tools.
              Hover over each tile to discover more.
            </p>
          </div>

          <div className="intro-symbol">
            <Sparkles size={32} strokeWidth={1.2} />
          </div>

        </div> */}

        {/* FEATURE GRID */}
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>

        {/* FOOTER */}
        <div className="features-footer">

          <span>
            MUSIC-THING / M1
          </span>

          <span>
            BUILT WITH AI + SPOTIFY
          </span>

          <span>
            12 FEATURES
          </span>

        </div>

      </div>
    </section>
    </div>
  );
}