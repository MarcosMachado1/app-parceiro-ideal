'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3, Sparkles, TrendingDown, Users, AlertTriangle, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface Answers {
  [key: string]: string | number | string[] | undefined
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

  // TELA INICIAL - DESIGN PREMIUM
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl w-full text-center relative z-10">
          
          {/* Badge Premium */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>Metodologia Validada • +10.000 Avaliações</span>
          </div>
          
          {/* Ícone Premium com gradiente */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 w-24 h-24 mx-auto"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl mx-auto flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          
          {/* Título Premium */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight px-2">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Traduza sua dúvida em dados.
            </span>
          </h1>
          
          {/* Subtítulo elegante */}
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 font-medium px-2 leading-relaxed max-w-3xl mx-auto">
            15 perguntas diretas. Um score de compatibilidade (0-100). <span className="text-blue-600 font-semibold">Clareza, finalmente.</span>
          </h2>
          
          {/* Cards de benefícios com design premium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">Análise Profunda</h3>
              <p className="text-sm text-gray-600">Baseada em valores, comunicação e futuro compartilhado.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">Resultado Imediato</h3>
              <p className="text-sm text-gray-600">Sem cadastro. Sem burocracia. Direto ao ponto.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">Diagnóstico Grátis</h3>
              <p className="text-sm text-gray-600">Plano de ação personalizado opcional.</p>
            </div>
          </div>
          
          {/* CTA Premium com gradiente e efeitos */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30"></div>
            <button
              onClick={() => setStarted(true)}
              className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg sm:text-xl md:text-2xl py-6 sm:py-7 px-8 sm:px-12 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-3xl group"
            >
              <span className="flex items-center justify-center gap-3">
                OBTER MEU DIAGNÓSTICO GRÁTIS
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
          
          {/* Elemento de confiança premium */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
            </div>
            <p className="font-medium">
              <span className="text-gray-900 font-semibold">10.000+</span> pessoas já descobriram sua compatibilidade
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center border border-gray-200">
          
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
            Seu Resultado
          </h1>
          
          <div className="mb-8">
            <div className="text-7xl sm:text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              {answers.score}
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">{answers.category}</div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${answers.score}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 text-left border border-blue-200 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Análise Inicial do Seu Score</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {getScoreAnalysis(answers.score as number)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 mb-6 border-2 border-blue-300 shadow-xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" />
              <span>OFERTA EXCLUSIVA</span>
            </div>
            
            <h3 className="font-bold text-2xl text-gray-900 mb-4">
              Desbloqueie o Relatório Completo
            </h3>
            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              Descubra os <strong>pontos críticos</strong> que estão impedindo seu relacionamento de prosperar, 
              receba <strong>5 ações práticas personalizadas</strong> e um plano detalhado para transformar sua relação.
            </p>
            <ul className="text-left text-sm text-gray-700 mb-6 space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Análise profunda de cada área do relacionamento</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Identificação dos seus pontos fortes e fracos</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>5 ações práticas e imediatas para melhorar</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Conselhos personalizados baseados nas suas respostas</span>
              </li>
            </ul>

            <div className="bg-white rounded-xl p-5 mb-6 border border-gray-200 shadow-md">
              <h4 className="font-bold text-lg text-gray-900 mb-3">💰 INVESTIMENTO & GARANTIA:</h4>
              <p className="text-base text-gray-700 mb-2">
                <strong>Valor: R$ 57</strong> (ou 2x de R$ 28,50)
              </p>
              <p className="text-base text-gray-700 mb-4">
                <strong>Formas de pagamento:</strong> Cartão, PIX, Boleto
              </p>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-300 shadow-sm">
                <p className="font-bold text-base text-gray-900 mb-2">🛡️ GARANTIA INCONDICIONAL DE 7 DIAS</p>
                <p className="text-sm text-gray-700">
                  Se em 1 semana você achar que o conteúdo não valeu o investimento, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                </p>
              </div>
            </div>

            <a
              href="https://pay.kiwify.com.br/LnKRt9G"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl group"
            >
              <span className="flex items-center justify-center gap-2">
                INVESTIR NO MEU RELACIONAMENTO (R$ 57)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6">
      {showMotivationalMessage && (
        <div className="fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl z-50 animate-slide-down max-w-[90%] sm:max-w-md text-center border border-blue-400">
          <p className="font-semibold text-sm sm:text-base">{motivationalMessage}</p>
        </div>
      )}
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-200">
        
        {/* IMAGEM ACIMA DA PERGUNTA */}
        <div className="mb-6 rounded-2xl overflow-hidden shadow-xl">
          <img 
            src={question.image} 
            alt={`Ilustração para: ${question.question}`}
            className="w-full h-48 sm:h-64 object-cover"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6 gap-2">
            <span className="text-sm font-semibold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full whitespace-nowrap border border-blue-200">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight break-words">{question.question}</h2>
        </div>

        <div className="mb-10">
          {question.type === 'select' && (
            <select
              value={answers[question.key] || ''}
              onChange={(e) => handleAnswer(question.key, e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white shadow-sm hover:border-blue-400"
            >
              <option value="">Selecione...</option>
              {question.options?.map(option => (
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
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb shadow-inner"
              />
              <div className="flex justify-between text-sm text-gray-600 px-2">
                <span className="font-medium">{question.min}</span>
                <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white shadow-sm hover:border-blue-400"
            />
          )}

          {question.type === 'multiselect' && (
            <div className="space-y-3">
              {question.options.map(option => (
                <label 
                  key={option} 
                  className="flex items-center p-4 border-2 border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer shadow-sm"
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
                    className="w-5 h-5 text-blue-600 border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 mr-3 flex-shrink-0"
                  />
                  <span className="text-base text-gray-800 font-medium break-words">
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
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white resize-none shadow-sm hover:border-blue-400"
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t-2 border-gray-200 gap-2">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 text-base text-gray-700 font-semibold rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          <button
            onClick={nextQuestion}
            disabled={!answers[question.key] || (question.type === 'multiselect' && (!answers[question.key] || (answers[question.key] as string[]).length === 0))}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100 text-base shadow-lg hover:shadow-xl group"
          >
            <span className="break-words">{currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx global>{`
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

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.5);
          transition: all 0.3s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.7);
        }

        .slider-thumb::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.5);
          transition: all 0.3s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.7);
        }
      `}</style>
    </div>
  )
}
