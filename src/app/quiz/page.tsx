'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Heart, Sparkles, TrendingUp, Users, AlertTriangle, CheckCircle, Star, Zap, Trophy, Target } from 'lucide-react'
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

  const motivationalQuestions = [2, 6, 9, 13]
  const messages = {
    2: "🔥 Você está arrasando! Continue assim!",
    6: "💖 Sua sinceridade vai te ajudar muito!",
    9: "✨ Quase lá! O resultado vai te surpreender!",
    13: "🎯 Última pergunta! Prepare-se para descobrir a verdade!"
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
      return "Seu relacionamento tem uma base sólida, mas mesmo os melhores casais precisam de ferramentas para manter a chama acesa e evitar que pequenos problemas se tornem grandes crises."
    } else if (score >= 60) {
      return "Seu relacionamento está em uma zona de alerta. Existem pontos críticos que, se não forem trabalhados AGORA, podem levar a um desgaste irreversível. A boa notícia? Você ainda tem tempo de reverter isso."
    } else if (score >= 40) {
      return "ATENÇÃO: Seu relacionamento está em risco sério. Os sinais que você está ignorando podem estar levando vocês para um caminho sem volta. É hora de agir com urgência antes que seja tarde demais."
    } else {
      return "ALERTA MÁXIMO: Seu relacionamento está em crise profunda. Sem intervenção imediata, as chances de ruptura são altíssimas. Você precisa de um plano de ação AGORA para salvar o que ainda pode ser salvo."
    }
  }

  const calculateResult = () => {
    const numericKeys = ['satisfacao', 'comunicacao', 'intimidade', 'confianca', 'tempo_qualidade', 'suporte', 'valores', 'vida_social', 'metas']
    let score = 0
    let count = 0

    numericKeys.forEach(key => {
      if (answers[key]) {
        score += parseInt(answers[key] as string)
        count++
      }
    })

    if (answers.conflitos && Array.isArray(answers.conflitos)) {
      score -= (answers.conflitos as string[]).length * 2
    }

    if (answers.planos === 'Sim') score += 10
    else if (answers.planos === 'Parcialmente') score += 5

    const finalScore = Math.max(0, Math.min(100, Math.round((score / (count * 10 + 15)) * 100)))

    let category = ''
    if (finalScore >= 80) category = 'Saudável'
    else if (finalScore >= 50) category = 'Em risco'
    else category = 'Precisa de ajuda'

    setAnswers(prev => ({ ...prev, score: finalScore, category }))
    setShowResult(true)
  }

  // PÁGINA INICIAL - FOCO EM ENTRETENIMENTO E CURIOSIDADE
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        
        {/* Elementos decorativos animados */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl w-full text-center relative z-10">
          
          {/* Badge viral com movimento */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-2xl animate-pulse">
            <Zap className="w-4 h-4" />
            <span>🔥 +47.382 PESSOAS FIZERAM HOJE</span>
          </div>
          
          {/* Ícone coração pulsante */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-3xl opacity-30 w-28 h-28 mx-auto animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 w-20 h-20 sm:w-28 sm:h-28 rounded-full mx-auto flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-bounce-slow">
              <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-white fill-white" />
            </div>
          </div>
          
          {/* Título VIRAL e CURIOSO */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight px-2">
            <span className="bg-gradient-to-r from-pink-600 via-red-600 to-purple-600 bg-clip-text text-transparent">
              Seu Relacionamento Vai Durar?
            </span>
          </h1>
          
          {/* Subtítulo com gatilho de curiosidade */}
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-800 mb-4 font-bold px-2 leading-relaxed max-w-3xl mx-auto">
            Descubra em <span className="text-red-600">3 minutos</span> se vocês têm futuro juntos 💔
          </h2>

          <p className="text-base sm:text-lg text-gray-700 mb-10 px-2 max-w-2xl mx-auto font-medium">
            <span className="text-purple-600 font-bold">98% das pessoas</span> se surpreendem com o resultado. E você?
          </p>
          
          {/* Cards de benefícios EMOCIONAIS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-pink-400">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-black text-gray-900 mb-2 text-lg">100% Grátis</h3>
              <p className="text-sm text-gray-700 font-medium">Sem pegadinhas. Sem cadastro. Resultado na hora!</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-400">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-black text-gray-900 mb-2 text-lg">Só 3 Minutos</h3>
              <p className="text-sm text-gray-700 font-medium">15 perguntas rápidas que revelam TUDO sobre vocês.</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-red-400">
              <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-black text-gray-900 mb-2 text-lg">Resultado Chocante</h3>
              <p className="text-sm text-gray-700 font-medium">Prepare-se para descobrir verdades que você não sabia.</p>
            </div>
          </div>
          
          {/* CTA GIGANTE E IRRESISTÍVEL */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
            <button
              onClick={() => setStarted(true)}
              className="relative w-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:via-red-600 hover:to-purple-700 text-white font-black text-xl sm:text-2xl md:text-3xl py-7 sm:py-8 px-8 sm:px-12 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group animate-bounce-slow"
            >
              <span className="flex items-center justify-center gap-3">
                🎯 DESCOBRIR AGORA (GRÁTIS)
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>

          {/* Prova social FORTE */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-4 border-white shadow-lg"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-4 border-white shadow-lg"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-4 border-white shadow-lg"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-white shadow-lg"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm">
                +47K
              </div>
            </div>
            <p className="text-base font-bold text-gray-800">
              ⭐⭐⭐⭐⭐ <span className="text-purple-600">47.382 pessoas</span> já descobriram a verdade
            </p>
            <p className="text-sm text-gray-600 font-medium italic">
              "Eu não acreditei no resultado... mas estava 100% certo 😱" - Ana, 28 anos
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
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
          }
        `}</style>
      </div>
    )
  }

  // PÁGINA DE RESULTADO - OTIMIZADA PARA CONVERSÃO MÁXIMA
  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-3xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center border-2 border-purple-200">
          
          {/* Badge de urgência */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-4 animate-pulse shadow-lg">
            <AlertTriangle className="w-4 h-4" />
            <span>⚠️ ATENÇÃO: RESULTADO REVELADO</span>
          </div>

          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-600 via-red-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Seu Score de Compatibilidade
          </h1>
          
          <div className="mb-8">
            <div className="text-7xl sm:text-8xl md:text-9xl font-black bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent mb-3">
              {answers.score}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{answers.category}</div>
            <div className="w-full bg-gray-200 rounded-full h-5 mb-6 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 h-5 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${answers.score}%` }}
              ></div>
            </div>
          </div>

          {/* AMPLIFICAÇÃO DA DOR */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 mb-8 text-left border-2 border-red-300 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-xl text-gray-900 mb-3">⚠️ O Que Isso Significa Para Você:</h3>
                <p className="text-base text-gray-800 leading-relaxed font-medium mb-4">
                  {getScoreAnalysis(answers.score as number)}
                </p>
                <p className="text-sm text-red-700 font-bold italic bg-red-100 p-3 rounded-lg border-l-4 border-red-500">
                  💔 A cada dia que passa sem agir, as chances de salvar seu relacionamento diminuem. Não deixe para amanhã o que pode mudar sua vida hoje.
                </p>
              </div>
            </div>
          </div>

          {/* PROVA SOCIAL FORTE */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border-2 border-green-300 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
            <h3 className="font-black text-lg text-gray-900 mb-4">💬 O Que Quem Já Transformou Seu Relacionamento Diz:</h3>
            <div className="space-y-4 text-left">
              <div className="bg-white p-4 rounded-xl shadow-md border border-green-200">
                <p className="text-sm text-gray-800 italic mb-2">"Eu estava a um passo de terminar tudo. Esse guia me mostrou EXATAMENTE onde estávamos errando. Hoje somos mais felizes do que nunca!" ❤️</p>
                <p className="text-xs text-gray-600 font-bold">- Mariana, 31 anos (Score: 52)</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-green-200">
                <p className="text-sm text-gray-800 italic mb-2">"Achei que era só mais um teste, mas o relatório completo mudou COMPLETAMENTE nossa forma de nos comunicar. Valeu cada centavo!" 🔥</p>
                <p className="text-xs text-gray-600 font-bold">- Carlos, 28 anos (Score: 67)</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-green-200">
                <p className="text-sm text-gray-800 italic mb-2">"Meu score era 43... estava em negação. O guia me abriu os olhos e salvou meu casamento de 8 anos. OBRIGADA!" 😭💕</p>
                <p className="text-xs text-gray-600 font-bold">- Juliana, 35 anos (Score: 43)</p>
              </div>
            </div>
          </div>

          {/* OFERTA IRRESISTÍVEL COM URGÊNCIA */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 mb-6 border-4 border-purple-400 shadow-2xl relative overflow-hidden">
            
            {/* Badge de desconto */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg transform rotate-12 animate-pulse">
              🔥 OFERTA RELÂMPAGO
            </div>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-black mb-6 shadow-lg">
              <Zap className="w-4 h-4" />
              <span>ACESSO IMEDIATO • VAGAS LIMITADAS</span>
            </div>
            
            <h3 className="font-black text-3xl text-gray-900 mb-4">
              🎁 Desbloqueie Seu Guia Completo de Transformação
            </h3>
            
            <p className="text-lg text-gray-800 mb-6 leading-relaxed font-bold">
              Você acabou de descobrir seu score. Mas e agora? <span className="text-red-600">O que fazer com essa informação?</span>
            </p>

            <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl border-2 border-purple-300">
              <h4 className="font-black text-xl text-gray-900 mb-4">📚 O Que Você Vai Receber AGORA:</h4>
              <ul className="text-left text-base text-gray-800 space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span><strong>Análise Profunda:</strong> Descubra EXATAMENTE onde seu relacionamento está falhando (e como consertar)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span><strong>5 Ações Práticas:</strong> Passos simples que você pode aplicar HOJE e ver resultados em dias</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span><strong>Plano de 30 Dias:</strong> Roteiro completo para transformar sua relação do zero</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span><strong>Técnicas de Comunicação:</strong> Aprenda a falar (e ouvir) de forma que fortalece o vínculo</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span><strong>Sinais de Alerta:</strong> Identifique problemas ANTES que se tornem crises irreversíveis</span>
                </li>
              </ul>
            </div>

            {/* Preço com urgência */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-yellow-400 shadow-lg">
              <p className="text-sm text-gray-700 mb-2 line-through">De R$ 197,00 por:</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-5xl font-black text-green-600">R$ 57</span>
                <div className="text-left">
                  <p className="text-sm text-gray-700 font-bold">ou 2x de</p>
                  <p className="text-2xl font-black text-green-600">R$ 28,50</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 font-bold mb-4">
                💳 Cartão • PIX • Boleto
              </p>
              
              {/* Garantia FORTE */}
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-5 border-2 border-green-400 shadow-md">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-black text-lg text-gray-900">🛡️ GARANTIA BLINDADA</h4>
                </div>
                <p className="text-base text-gray-800 font-bold mb-2">
                  7 DIAS DE GARANTIA INCONDICIONAL
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Se você não ficar 100% satisfeito, devolvemos TODO o seu dinheiro. Sem perguntas. Sem enrolação. Você não tem NADA a perder.
                </p>
              </div>
            </div>

            {/* CTA FINAL GIGANTE */}
            <a
              href="https://pay.kiwify.com.br/LnKRt9G"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white font-black text-xl sm:text-2xl py-7 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group mb-4"
            >
              <span className="flex items-center justify-center gap-3">
                🚀 SIM! QUERO TRANSFORMAR MEU RELACIONAMENTO
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </a>
            
            <p className="text-xs text-gray-600 mb-2">
              ✅ Acesso 100% imediato • 🔒 Pagamento seguro • 🛡️ Garantia de 7 dias
            </p>

            {/* Escassez final */}
            <div className="bg-red-100 border-2 border-red-400 rounded-xl p-4 mt-4">
              <p className="text-sm text-red-800 font-bold">
                ⏰ <span className="text-red-600">ATENÇÃO:</span> Essa oferta pode sair do ar a qualquer momento. Não perca a chance de salvar seu relacionamento por apenas R$ 57!
              </p>
            </div>
          </div>

          {/* Último empurrão emocional */}
          <div className="text-center">
            <p className="text-base text-gray-700 italic font-medium mb-2">
              💭 "E se daqui a 6 meses você olhar pra trás e pensar: 'Por que eu não agi quando ainda tinha tempo?'"
            </p>
            <p className="text-sm text-gray-600 font-bold">
              A escolha é sua. Mas lembre-se: <span className="text-red-600">cada dia que passa, as chances diminuem.</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  // DURANTE O QUIZ - MANTER ENGAJAMENTO
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 flex items-center justify-center p-4 sm:p-6">
      {showMotivationalMessage && (
        <div className="fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl z-50 animate-slide-down max-w-[90%] sm:max-w-md text-center border-2 border-white">
          <p className="font-black text-base sm:text-lg">{motivationalMessage}</p>
        </div>
      )}
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border-2 border-purple-200">
        
        {/* IMAGEM ACIMA DA PERGUNTA */}
        <div className="mb-6 rounded-2xl overflow-hidden shadow-xl border-4 border-purple-200">
          <img 
            src={question.image} 
            alt={`Ilustração para: ${question.question}`}
            className="w-full h-48 sm:h-64 object-cover"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6 gap-2">
            <span className="text-sm font-black text-white bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
              {currentQuestion + 1} de {questions.length}
            </span>
            <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 leading-tight break-words">{question.question}</h2>
        </div>

        <div className="mb-10">
          {question.type === 'select' && (
            <select
              value={answers[question.key] || ''}
              onChange={(e) => handleAnswer(question.key, e.target.value)}
              className="w-full p-4 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-base sm:text-lg bg-white shadow-md hover:border-purple-400 font-medium"
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
                className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb shadow-inner"
              />
              <div className="flex justify-between text-sm text-gray-600 px-2">
                <span className="font-bold">{question.min}</span>
                <span className="font-black text-4xl bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
                  {answers[question.key] || question.min}
                </span>
                <span className="font-bold">{question.max}</span>
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
              className="w-full p-4 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-base sm:text-lg bg-white shadow-md hover:border-purple-400 font-medium"
            />
          )}

          {question.type === 'multiselect' && (
            <div className="space-y-3">
              {question.options?.map(option => (
                <label 
                  key={option} 
                  className="flex items-center p-4 border-2 border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 cursor-pointer shadow-md"
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
                    className="w-5 h-5 text-purple-600 border-2 border-purple-400 rounded focus:ring-2 focus:ring-purple-500 mr-3 flex-shrink-0"
                  />
                  <span className="text-base text-gray-800 font-bold break-words">
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
              className="w-full p-4 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-base sm:text-lg bg-white resize-none shadow-md hover:border-purple-400 font-medium"
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t-2 border-purple-200 gap-2">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 text-base text-gray-700 font-bold rounded-xl hover:bg-purple-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border-2 border-purple-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          <button
            onClick={nextQuestion}
            disabled={!answers[question.key] || (question.type === 'multiselect' && (!answers[question.key] || (answers[question.key] as string[]).length === 0))}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:via-red-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-black py-4 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 text-base shadow-xl hover:shadow-2xl group"
          >
            <span className="break-words">{currentQuestion === questions.length - 1 ? '🎯 VER RESULTADO' : 'PRÓXIMA'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EC4899 0%, #EF4444 50%, #9333EA 100%);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.6);
          transition: all 0.3s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.8);
        }

        .slider-thumb::-moz-range-thumb {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EC4899 0%, #EF4444 50%, #9333EA 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.6);
          transition: all 0.3s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.3);
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.8);
        }
      `}</style>
    </div>
  )
}
