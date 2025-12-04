'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Heart, Sparkles } from 'lucide-react'

interface Answers {
  [key: string]: string | number | string[] | undefined  // ADICIONE "| undefined" AQUI
  score?: number
  category?: string
}

const questions = [
  {
    id: 1,
    type: 'select',
    question: 'Qual é seu status relacional atual?',
    options: ['Solteiro', 'Namorando', 'Noivo', 'Casado'],
    key: 'status'
  },
  {
    id: 2,
    type: 'number',
    question: 'Há quanto tempo vocês estão juntos? (em meses)',
    min: 0,
    max: 240,
    key: 'tempo'
  },
  {
    id: 3,
    type: 'range',
    question: 'Qual é sua satisfação geral com o relacionamento? (1-10)',
    min: 1,
    max: 10,
    key: 'satisfacao'
  },
  {
    id: 4,
    type: 'range',
    question: 'Como você avalia o nível de comunicação? (1-10)',
    min: 1,
    max: 10,
    key: 'comunicacao'
  },
  {
    id: 5,
    type: 'range',
    question: 'Qual é o nível de intimidade emocional? (1-10)',
    min: 1,
    max: 10,
    key: 'intimidade'
  },
  {
    id: 6,
    type: 'multiselect',
    question: 'Quais conflitos são frequentes no relacionamento?',
    options: ['Dinheiro', 'Família', 'Trabalho', 'Tempo juntos', 'Infidelidade', 'Falta de confiança', 'Outros'],
    key: 'conflitos'
  },
  {
    id: 7,
    type: 'select',
    question: 'Seus planos futuros estão alinhados?',
    options: ['Sim', 'Parcialmente', 'Não'],
    key: 'planos'
  },
  {
    id: 8,
    type: 'range',
    question: 'Qual é o nível de confiança no seu parceiro? (1-10)',
    min: 1,
    max: 10,
    key: 'confianca'
  },
  {
    id: 9,
    type: 'range',
    question: 'Como você avalia o tempo de qualidade juntos? (1-10)',
    min: 1,
    max: 10,
    key: 'tempo_qualidade'
  },
  {
    id: 10,
    type: 'range',
    question: 'Qual é o nível de suporte emocional? (1-10)',
    min: 1,
    max: 10,
    key: 'suporte'
  },
  {
    id: 11,
    type: 'range',
    question: 'Quão compartilhados são seus valores? (1-10)',
    min: 1,
    max: 10,
    key: 'valores'
  },
  {
    id: 12,
    type: 'range',
    question: 'Como é a vida social compartilhada? (1-10)',
    min: 1,
    max: 10,
    key: 'vida_social'
  },
  {
    id: 13,
    type: 'range',
    question: 'Suas metas de vida são compatíveis? (1-10)',
    min: 1,
    max: 10,
    key: 'metas'
  },
  {
    id: 14,
    type: 'text',
    question: 'Qual é seu maior medo no relacionamento?',
    key: 'medo'
  },
  {
    id: 15,
    type: 'text',
    question: 'O que você mais valoriza no seu parceiro?',
    key: 'valoriza'
  }
]

export default function Quiz() {
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

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
            
            <Heart className="w-20 h-20 text-pink-500 mx-auto mb-6 animate-bounce-slow" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Seu Resultado
            </h1>
          </div>
          
          <div className="mb-8 relative">
            <div className="text-7xl md:text-8xl font-bold text-pink-500 mb-3 animate-scale-in">
              {answers.score}
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-4">{answers.category}</div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${answers.score}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-8 text-left border border-pink-100 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Análise Inicial do Seu Score</h3>
                <p className="text-gray-700 leading-relaxed">
                  {getScoreAnalysis(answers.score as number)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-amber-200 shadow-lg">
            <h3 className="font-bold text-xl text-gray-800 mb-3 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Desbloqueie o Relatório Completo
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Descubra os <strong>pontos críticos</strong> que estão impedindo seu relacionamento de prosperar, 
              receba <strong>5 ações práticas personalizadas</strong> e um plano detalhado para transformar sua relação.
            </p>
            <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">✓</span>
                <span>Análise profunda de cada área do relacionamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">✓</span>
                <span>Identificação dos seus pontos fortes e fracos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">✓</span>
                <span>5 ações práticas e imediatas para melhorar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">✓</span>
                <span>Conselhos personalizados baseados nas suas respostas</span>
              </li>
            </ul>
            <a
              href="https://pay.kiwify.com.br/LnKRt9G"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              💝 Transformar Meu Relacionamento Agora
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
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-slide-down max-w-md text-center">
          <p className="font-semibold text-lg">{motivationalMessage}</p>
        </div>
      )}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-gray-600 bg-pink-50 px-4 py-2 rounded-full">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">{question.question}</h2>
        </div>

        <div className="mb-10">
           {question.type === 'select' && question.options && (
  <select
    value={answers[question.key] || ''}
    onChange={(e) => handleAnswer(question.key, e.target.value)}
    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
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
                className="w-full h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-sm text-gray-500 px-2">
                <span className="font-medium">{question.min}</span>
                <span className="font-bold text-2xl text-pink-500 animate-pulse">
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
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
            />
          )}

          {question.type === 'multiselect' && question.options && (
  <div className="space-y-3">
    {question.options.map(option => (
      <label 
        key={option} 
        className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 cursor-pointer group"
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
          className="w-5 h-5 text-pink-500 border-2 border-gray-300 rounded focus:ring-2 focus:ring-pink-500 mr-3"
        />
        <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
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
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white resize-none"
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t-2 border-gray-100">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Anterior
          </button>
          <button
            onClick={nextQuestion}
            disabled={!answers[question.key] || (question.type === 'multiselect' && (!answers[question.key] || (answers[question.key] as string[]).length === 0))}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
            <ArrowRight className="w-5 h-5" />
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
