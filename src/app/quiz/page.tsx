'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Heart, Sparkles, TrendingDown, Users, AlertTriangle, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface Answers {
  [key: string]: string | number | string[]
  score?: number
  category?: string
}

const questions = [
  {
    id: 1,
    type: 'select',
    question: 'Qual é seu status relacional atual?',
    options: ['Solteiro', 'Namorando', 'Noivo', 'Casado'],
    key: 'status',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    type: 'number',
    question: 'Há quanto tempo vocês estão juntos? (em meses)',
    min: 0,
    max: 240,
    key: 'tempo',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    type: 'range',
    question: 'Qual é sua satisfação geral com o relacionamento? (1-10)',
    min: 1,
    max: 10,
    key: 'satisfacao',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    type: 'range',
    question: 'Como você avalia o nível de comunicação? (1-10)',
    min: 1,
    max: 10,
    key: 'comunicacao',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    type: 'range',
    question: 'Qual é o nível de intimidade emocional? (1-10)',
    min: 1,
    max: 10,
    key: 'intimidade',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    type: 'multiselect',
    question: 'Quais conflitos são frequentes no relacionamento?',
    options: ['Dinheiro', 'Família', 'Trabalho', 'Tempo juntos', 'Infidelidade', 'Falta de confiança', 'Outros'],
    key: 'conflitos',
    image: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&h=600&fit=crop'
  },
  {
    id: 7,
    type: 'select',
    question: 'Seus planos futuros estão alinhados?',
    options: ['Sim', 'Parcialmente', 'Não'],
    key: 'planos',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop'
  },
  {
    id: 8,
    type: 'range',
    question: 'Qual é o nível de confiança no seu parceiro? (1-10)',
    min: 1,
    max: 10,
    key: 'confianca',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop'
  },
  {
    id: 9,
    type: 'range',
    question: 'Como você avalia o tempo de qualidade juntos? (1-10)',
    min: 1,
    max: 10,
    key: 'tempo_qualidade',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop'
  },
  {
    id: 10,
    type: 'range',
    question: 'Qual é o nível de suporte emocional? (1-10)',
    min: 1,
    max: 10,
    key: 'suporte',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
  },
  {
    id: 11,
    type: 'range',
    question: 'Quão compartilhados são seus valores? (1-10)',
    min: 1,
    max: 10,
    key: 'valores',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop'
  },
  {
    id: 12,
    type: 'range',
    question: 'Como é a vida social compartilhada? (1-10)',
    min: 1,
    max: 10,
    key: 'vida_social',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=600&fit=crop'
  },
  {
    id: 13,
    type: 'range',
    question: 'Suas metas de vida são compatíveis? (1-10)',
    min: 1,
    max: 10,
    key: 'metas',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop'
  },
  {
    id: 14,
    type: 'text',
    question: 'Qual é seu maior medo no relacionamento?',
    key: 'medo',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop'
  },
  {
    id: 15,
    type: 'text',
    question: 'O que você mais valoriza no seu parceiro?',
    key: 'valoriza',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop'
  }
]

export default function Quiz() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResult, setShowResult] = useState(false)
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false)
  const [motivationalMessage, setMotivationalMessage] = useState('')

  const motivationalQuestions = [2, 6, 9, 13] // índices 0-based para perguntas 3,7,10,14
  const messages = {
    2: "💕 Estamos aqui pra te ajudar a encontrar mais satisfação!",
    6: "🌟 Planos alinhados são fundamentais! Estamos te guiando.",
    9: "🤗 Suporte emocional é essencial. Conte conosco!",
    13: "💪 Compartilhar medos fortalece vínculos. Você está no caminho certo!"
  }

  const handleAnswer = (key: string, value: string | number | string[]) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      if (motivationalQuestions.includes(currentQuestion + 1)) {
        setMotivationalMessage(messages[currentQuestion + 1 as keyof typeof messages])
        setShowMotivationalMessage(true)
        setTimeout(() => setShowMotivationalMessage(false), 3000)
      }
    } else {
      calculateResult()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getScoreAnalysis = (score: number) => {
    if (score >= 80) {
      return "Seu relacionamento mostra sinais muito positivos! A comunicação e confiança estão em níveis excelentes, mas sempre há espaço para aprofundar ainda mais a conexão."
    } else if (score >= 60) {
      return "Existem áreas sólidas no seu relacionamento, mas alguns pontos precisam de atenção. A boa notícia é que com pequenos ajustes, você pode elevar significativamente a qualidade da relação."
    } else if (score >= 40) {
      return "Seu relacionamento está enfrentando desafios importantes. Os padrões de comunicação e confiança precisam ser trabalhados urgentemente para evitar desgastes maiores."
    } else {
      return "Há sinais críticos que não podem ser ignorados. Seu relacionamento precisa de intervenção imediata para reconstruir as bases de confiança e comunicação."
    }
  }

  const calculateResult = () => {
    // Cálculo simples do score baseado nas respostas numéricas
    const numericKeys = ['satisfacao', 'comunicacao', 'intimidade', 'confianca', 'tempo_qualidade', 'suporte', 'valores', 'vida_social', 'metas']
    let score = 0
    let count = 0

    numericKeys.forEach(key => {
      if (answers[key]) {
        score += parseInt(answers[key] as string)
        count++
      }
    })

    // Penalizar conflitos
    if (answers.conflitos && Array.isArray(answers.conflitos)) {
      score -= (answers.conflitos as string[]).length * 2
    }

    // Bonus para planos alinhados
    if (answers.planos === 'Sim') score += 10
    else if (answers.planos === 'Parcialmente') score += 5

    // Normalizar para 0-100
    const finalScore = Math.max(0, Math.min(100, Math.round((score / (count * 10 + 15)) * 100)))

    let category = ''
    if (finalScore >= 80) category = 'Saudável'
    else if (finalScore >= 50) category = 'Em risco'
    else category = 'Precisa de ajuda'

    setAnswers(prev => ({ ...prev, score: finalScore, category }))
    setShowResult(true)
  }

  // TELA INICIAL - PÁGINA DE VENDA APELATIVA E PERSUASIVA
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center animate-fade-in relative overflow-hidden">
          {/* Efeitos de fundo premium */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
          
          <div className="relative z-10">
            {/* Badge de urgência */}
            <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 shadow-lg animate-pulse">
              ⚡ DIAGNÓSTICO GRATUITO • 3 MINUTOS
            </div>
            
            {/* Título impactante */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              A resposta para{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-rose-500 bg-clip-text text-transparent break-words">
                "Será que é ele(a)?"
              </span>
            </h1>
            
            {/* Subtítulo direto */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-3 sm:mb-4 font-bold px-2">
              Está em 15 perguntas diretas
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 font-medium px-2">
              Descubra se você está construindo algo sólido ou apenas evitando uma conversa difícil
            </p>

            {/* SEÇÃO DE PESQUISA CIENTÍFICA - ALERTA VERMELHO */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-left shadow-xl border-2 border-red-200">
              <div className="flex items-start sm:items-center gap-3 mb-4 sm:mb-6">
                <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
                  A Crise Silenciosa dos Relacionamentos
                </h3>
              </div>
              
              <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-md border-l-4 border-red-500">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  Segundo estudo publicado no <strong>Journal of Marriage and Family (2023)</strong>, 
                  <span className="text-red-600 font-bold"> 67% dos casais relatam insatisfação significativa</span> nos 
                  primeiros 5 anos de relacionamento, mas <span className="text-red-600 font-bold">apenas 23% buscam ajuda antes de atingir ponto crítico</span>.
                </p>
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  Fonte: Gottman Institute & Journal of Marriage and Family, 2023
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-t-4 border-red-500">
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mx-auto mb-2 sm:mb-3" />
                  <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">67%</div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Casais insatisfeitos nos primeiros 5 anos</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-t-4 border-orange-500">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mx-auto mb-2 sm:mb-3" />
                  <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">42%</div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Terminam por falta de comunicação efetiva</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md text-center border-t-4 border-yellow-500">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mx-auto mb-2 sm:mb-3" />
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-2">23%</div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Buscam ajuda antes do colapso total</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-4 sm:p-6 text-white">
                <p className="font-bold text-base sm:text-lg mb-2">⚠️ O Problema Real:</p>
                <p className="text-sm sm:text-base leading-relaxed">
                  A maioria dos casais <strong>espera demais</strong> para agir. Quando finalmente buscam ajuda, 
                  os padrões destrutivos já estão enraizados há anos. <strong>Diagnóstico precoce salva relacionamentos.</strong>
                </p>
              </div>
            </div>

            {/* ESTUDOS DE CASO - PROVAS SOCIAIS */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-left shadow-xl border-2 border-green-200">
              <div className="flex items-start sm:items-center gap-3 mb-4 sm:mb-6">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
                  Histórias Reais de Transformação
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {/* Caso 1 */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-green-500">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-base sm:text-lg break-words">Mariana & Felipe, 4 anos juntos</p>
                      <p className="text-xs sm:text-sm text-gray-500">Score inicial: 42/100 → Score atual: 87/100</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                    "Estávamos à beira do fim. Brigávamos por tudo, não nos entendíamos mais. O diagnóstico mostrou que 
                    nosso problema não era falta de amor, mas <strong>comunicação destrutiva</strong>. Em 3 meses aplicando 
                    as estratégias, voltamos a nos conectar de verdade."
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Relacionamento salvo em 90 dias</span>
                  </div>
                </div>

                {/* Caso 2 */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-blue-500">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-base sm:text-lg break-words">Carlos & Ana, 7 anos juntos</p>
                      <p className="text-xs sm:text-sm text-gray-500">Score inicial: 38/100 → Score atual: 82/100</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                    "Descobrimos que nossos <strong>valores fundamentais estavam desalinhados</strong> e ninguém tinha coragem 
                    de falar sobre isso. O relatório nos deu clareza e ferramentas práticas. Hoje somos mais fortes do que nunca."
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 font-semibold">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Comunicação transformada</span>
                  </div>
                </div>

                {/* Caso 3 */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-purple-500">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-base sm:text-lg break-words">Júlia & Pedro, 2 anos juntos</p>
                      <p className="text-xs sm:text-sm text-gray-500">Score inicial: 55/100 → Score atual: 91/100</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                    "Achávamos que estava tudo bem, mas o diagnóstico revelou <strong>pontos cegos críticos</strong> que 
                    poderiam nos destruir no futuro. Agir preventivamente foi a melhor decisão que tomamos."
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-600 font-semibold">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Prevenção que salvou o futuro</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-4 sm:p-6 text-white mt-4 sm:mt-6">
                <p className="font-bold text-base sm:text-lg mb-2">✨ Padrão Comum:</p>
                <p className="text-sm sm:text-base leading-relaxed">
                  Todos esses casais tinham algo em comum: <strong>identificaram os problemas ANTES que fosse tarde demais</strong>. 
                  O diagnóstico precoce + ações práticas = relacionamento transformado.
                </p>
              </div>
            </div>
            
            {/* Box de valor - O que você vai descobrir */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-left shadow-lg border-2 border-pink-200">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center flex items-center justify-center gap-2 flex-wrap">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-pink-500 flex-shrink-0" />
                <span className="break-words">O que este diagnóstico revela:</span>
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-1 break-words">Compatibilidade Real de Valores</h4>
                    <p className="text-sm sm:text-base text-gray-600">Vai além da paixão: descubra se vocês compartilham os mesmos princípios fundamentais para uma vida a dois.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    2
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-1 break-words">Comunicação Sob Pressão</h4>
                    <p className="text-sm sm:text-base text-gray-600">Como vocês se comportam nos momentos difíceis? A verdadeira força de um relacionamento aparece no estresse.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    3
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-1 break-words">Alinhamento de Futuro</h4>
                    <p className="text-sm sm:text-base text-gray-600">Vocês estão caminhando na mesma direção? Descubra se seus sonhos e planos são compatíveis.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Prova social */}
            <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-md border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-white"></div>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-semibold">+2.847 pessoas</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                já descobriram a verdade sobre seus relacionamentos nas últimas 48 horas
              </p>
            </div>
            
            {/* CTA Principal */}
            <button
              onClick={() => setStarted(true)}
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:via-rose-600 hover:to-purple-700 text-white font-extrabold text-base sm:text-xl md:text-2xl py-4 sm:py-6 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl mb-4 sm:mb-6 relative overflow-hidden group"
            >
              <span className="relative z-10 break-words">INICIAR DIAGNÓSTICO AGORA (GRATUITO)</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
            
            {/* Garantias e benefícios */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-xs sm:text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span className="text-green-500 font-bold text-base sm:text-lg">✓</span>
                <span className="font-semibold">Resultado imediato</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500 font-bold text-base sm:text-lg">✓</span>
                <span className="font-semibold">Sem cadastro</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-500 font-bold text-base sm:text-lg">✓</span>
                <span className="font-semibold">100% confidencial</span>
              </span>
            </div>
            
            {/* Nota final */}
            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 italic px-2">
              Após o score gratuito, você pode optar pelo relatório detalhado com ações práticas personalizadas
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center animate-fade-in">
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
            
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-pink-500 mx-auto mb-4 sm:mb-6 animate-bounce-slow" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Seu Resultado
            </h1>
          </div>
          
          <div className="mb-6 sm:mb-8 relative">
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-pink-500 mb-3 animate-scale-in">
              {answers.score}
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">{answers.category}</div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-4 sm:mb-6 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${answers.score}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-left border border-pink-100 shadow-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2">Análise Inicial do Seu Score</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {getScoreAnalysis(answers.score as number)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-amber-200 shadow-lg">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3 flex items-center justify-center gap-2 flex-wrap">
              <Heart className="w-5 h-5 text-pink-500 flex-shrink-0" />
              <span>Desbloqueie o Relatório Completo</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
              Descubra os <strong>pontos críticos</strong> que estão impedindo seu relacionamento de prosperar, 
              receba <strong>5 ações práticas personalizadas</strong> e um plano detalhado para transformar sua relação.
            </p>
            <ul className="text-left text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold flex-shrink-0">✓</span>
                <span>Análise profunda de cada área do relacionamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold flex-shrink-0">✓</span>
                <span>Identificação dos seus pontos fortes e fracos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold flex-shrink-0">✓</span>
                <span>5 ações práticas e imediatas para melhorar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold flex-shrink-0">✓</span>
                <span>Conselhos personalizados baseados nas suas respostas</span>
              </li>
            </ul>

            {/* INVESTIMENTO & GARANTIA */}
            <div className="bg-white rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 border-2 border-pink-200 shadow-sm">
              <h4 className="font-bold text-base sm:text-lg text-gray-800 mb-3">💰 INVESTIMENTO & GARANTIA:</h4>
              <p className="text-sm sm:text-base text-gray-700 mb-2">
                <strong>Valor: R$ 57</strong> (ou 2x de R$ 28,50)
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                <strong>Formas de pagamento:</strong> Cartão, PIX, Boleto
              </p>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-200">
                <p className="font-bold text-sm sm:text-base text-gray-800 mb-2">🛡️ GARANTIA INCONDICIONAL DE 7 DIAS</p>
                <p className="text-xs sm:text-sm text-gray-700">
                  Se em 1 semana você achar que o conteúdo não valeu o investimento, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                </p>
              </div>
            </div>

            <a
              href="https://pay.kiwify.com.br/LnKRt9G"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl break-words"
            >
              INVESTIR NO MEU RELACIONAMENTO (R$ 57)
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Acesso imediato • Pagamento 100% seguro
            </p>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
      {showMotivationalMessage && (
        <div className="fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl z-50 animate-slide-down max-w-[90%] sm:max-w-md text-center">
          <p className="font-semibold text-sm sm:text-lg">{motivationalMessage}</p>
        </div>
      )}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 animate-fade-in">
        {/* IMAGEM ACIMA DA PERGUNTA */}
        <div className="mb-4 sm:mb-6 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={question.image} 
            alt={`Ilustração para: ${question.question}`}
            className="w-full h-48 sm:h-64 object-cover"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600 bg-pink-50 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight break-words">{question.question}</h2>
        </div>

        <div className="mb-8 sm:mb-10">
          {question.type === 'select' && (
            <select
              value={answers[question.key] || ''}
              onChange={(e) => handleAnswer(question.key, e.target.value)}
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-base sm:text-lg bg-gray-50 hover:bg-white"
            >
              <option value="">Selecione...</option>
              {question.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}

          {question.type === 'range' && (
            <div className="space-y-4">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={answers[question.key] || question.min}
                onChange={(e) => handleAnswer(question.key, e.target.value)}
                className="w-full h-2 sm:h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-500 px-2">
                <span className="font-medium">{question.min}</span>
                <span className="font-bold text-xl sm:text-2xl text-pink-500 animate-pulse">
                  {answers[question.key] || question.min}
                </span>
                <span className="font-medium">{question.max}</span>
              </div>
            </div>
          )}

          {question.type === 'number' && (
            <input
              type="number"
              min={question.min}
              max={question.max}
              value={answers[question.key] || ''}
              onChange={(e) => handleAnswer(question.key, e.target.value)}
              placeholder="Digite o número..."
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-base sm:text-lg bg-gray-50 hover:bg-white"
            />
          )}

          {question.type === 'multiselect' && (
            <div className="space-y-3">
              {question.options.map(option => (
                <label 
                  key={option} 
                  className="flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={(answers[question.key] as string[])?.includes(option) || false}
                    onChange={(e) => {
                      const current = (answers[question.key] as string[]) || []
                      if (e.target.checked) {
                        handleAnswer(question.key, [...current, option])
                      } else {
                        handleAnswer(question.key, current.filter(item => item !== option))
                      }
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 border-2 border-gray-300 rounded focus:ring-2 focus:ring-pink-500 mr-3 flex-shrink-0"
                  />
                  <span className="text-sm sm:text-base text-gray-700 font-medium group-hover:text-pink-600 transition-colors break-words">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <textarea
              value={answers[question.key] || ''}
              onChange={(e) => handleAnswer(question.key, e.target.value)}
              placeholder="Digite sua resposta..."
              rows={5}
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-base sm:text-lg bg-gray-50 hover:bg-white resize-none"
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-4 sm:pt-6 border-t-2 border-gray-100 gap-2">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-600 font-semibold rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          <button
            onClick={nextQuestion}
            disabled={!answers[question.key] || (question.type === 'multiselect' && (!answers[question.key] || (answers[question.key] as string[]).length === 0))}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none text-sm sm:text-base"
          >
            <span className="break-words">{currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translate(-50%, -100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4);
          transition: all 0.3s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.6);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4);
          transition: all 0.3s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.6);
        }
      `}</style>
    </div>
  )
}
