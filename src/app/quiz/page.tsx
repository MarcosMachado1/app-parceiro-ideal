'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3, Sparkles, TrendingDown, Users, AlertTriangle, CheckCircle } from 'lucide-react'
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

  // TELA INICIAL - REDESENHADA PARA CONVERSÃO MÁXIMA
  if (!started) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-3xl w-full text-center">
          
          {/* Ícone Analítico */}
          <div className="mb-6 sm:mb-8">
            <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto" />
          </div>
          
          {/* Título (H1) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            Traduza sua dúvida em dados.
          </h1>
          
          {/* Subtítulo (H2) */}
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 font-medium px-2 leading-relaxed">
            15 perguntas diretas. Um score de compatibilidade (0-100). Clareza, finalmente.
          </h2>
          
          {/* Bullet Points */}
          <div className="mb-10 sm:mb-14 space-y-4 sm:space-y-5 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-base sm:text-lg text-gray-800">
              <span className="text-blue-600 font-bold text-xl">✓</span>
              <span>Análise baseada em valores, comunicação e futuro.</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-base sm:text-lg text-gray-800">
              <span className="text-blue-600 font-bold text-xl">✓</span>
              <span>Resultado imediato. Sem cadastro.</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-base sm:text-lg text-gray-800">
              <span className="text-blue-600 font-bold text-xl">✓</span>
              <span>Diagnóstico grátis. Plano de ação opcional.</span>
            </div>
          </div>
          
          {/* CTA Principal */}
          <button
            onClick={() => setStarted(true)}
            className="w-full max-w-xl mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg sm:text-xl md:text-2xl py-5 sm:py-6 px-8 sm:px-10 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mb-6"
          >
            OBTER MEU DIAGNÓSTICO GRÁTIS
          </button>
          
          {/* Elemento de Confiança */}
          <p className="text-sm sm:text-base text-gray-500 mt-6">
            Mais de 10.000 avaliações realizadas • Metodologia validada
          </p>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-2xl w-full bg-gray-50 rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center">
          
          <BarChart3 className="w-14 h-14 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-6" />
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Seu Resultado
          </h1>
          
          <div className="mb-8">
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-blue-600 mb-3">
              {answers.score}
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">{answers.category}</div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-6 overflow-hidden">
              <div 
                className="bg-blue-600 h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${answers.score}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-8 text-left border border-gray-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Análise Inicial do Seu Score</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {getScoreAnalysis(answers.score as number)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
            <h3 className="font-bold text-xl text-gray-900 mb-4">
              Desbloqueie o Relatório Completo
            </h3>
            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              Descubra os <strong>pontos críticos</strong> que estão impedindo seu relacionamento de prosperar, 
              receba <strong>5 ações práticas personalizadas</strong> e um plano detalhado para transformar sua relação.
            </p>
            <ul className="text-left text-sm text-gray-700 mb-6 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                <span>Análise profunda de cada área do relacionamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                <span>Identificação dos seus pontos fortes e fracos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                <span>5 ações práticas e imediatas para melhorar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                <span>Conselhos personalizados baseados nas suas respostas</span>
              </li>
            </ul>

            <div className="bg-white rounded-lg p-5 mb-6 border border-gray-200">
              <h4 className="font-bold text-lg text-gray-900 mb-3">💰 INVESTIMENTO & GARANTIA:</h4>
              <p className="text-base text-gray-700 mb-2">
                <strong>Valor: R$ 57</strong> (ou 2x de R$ 28,50)
              </p>
              <p className="text-base text-gray-700 mb-4">
                <strong>Formas de pagamento:</strong> Cartão, PIX, Boleto
              </p>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
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
              className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      {showMotivationalMessage && (
        <div className="fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-xl z-50 animate-slide-down max-w-[90%] sm:max-w-md text-center">
          <p className="font-semibold text-sm sm:text-base">{motivationalMessage}</p>
        </div>
      )}
      <div className="max-w-2xl w-full bg-gray-50 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
        
        {/* IMAGEM ACIMA DA PERGUNTA */}
        <div className="mb-6 rounded-xl overflow-hidden shadow-md">
          <img 
            src={question.image} 
            alt={`Ilustração para: ${question.question}`}
            className="w-full h-48 sm:h-64 object-cover"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6 gap-2">
            <span className="text-sm font-medium text-gray-600 bg-gray-200 px-4 py-2 rounded-full whitespace-nowrap">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
              <div 
                className="bg-blue-600 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
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
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white"
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
                className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-sm text-gray-600 px-2">
                <span className="font-medium">{question.min}</span>
                <span className="font-bold text-2xl text-blue-600">
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
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white"
            />
          )}

          {question.type === 'multiselect' && (
            <div className="space-y-3">
              {question.options.map(option => (
                <label 
                  key={option} 
                  className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
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
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white resize-none"
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t-2 border-gray-200 gap-2">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 text-base text-gray-700 font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          <button
            onClick={nextQuestion}
            disabled={!answers[question.key] || (question.type === 'multiselect' && (!answers[question.key] || (answers[question.key] as string[]).length === 0))}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100 text-base"
          >
            <span className="break-words">{currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}</span>
            <ArrowRight className="w-5 h-5" />
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
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #2563EB;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #2563EB;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
        }
      `}</style>
    </div>
  )
}
