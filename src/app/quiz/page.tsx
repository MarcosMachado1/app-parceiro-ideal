'use client'

import { useState, ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Heart, Star, CheckCircle, AlertCircle } from 'lucide-react'

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

// Interface para tipagem simples
interface Answers {
  [key: string]: string | number | string[] | undefined
}

interface ResultData {
  score: number
  category: string
  icon: ReactNode
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResult, setShowResult] = useState(false)
  const [resultData, setResultData] = useState<ResultData | null>(null)

  const handleAnswer = (key: string, value: string | number | string[]) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResult = () => {
    const numericKeys = ['satisfacao', 'comunicacao', 'intimidade', 'confianca', 'tempo_qualidade', 'suporte', 'valores', 'vida_social', 'metas']
    let score = 0
    let count = 0

    numericKeys.forEach(key => {
      const value = answers[key]
      if (value !== undefined && value !== '') {
        score += parseInt(value as string)
        count++
      }
    })

    // Penalizar conflitos
    const conflitos = answers.conflitos as string[]
    if (conflitos && Array.isArray(conflitos)) {
      score -= conflitos.length * 2
    }

    // Bonus para planos alinhados
    if (answers.planos === 'Sim') score += 10
    else if (answers.planos === 'Parcialmente') score += 5

    // Normalizar para 0-100
    const maxPossibleScore = count * 10 + 15
    const finalScore = Math.max(0, Math.min(100, Math.round((score / maxPossibleScore) * 100)))

    let category = ''
    let icon: ReactNode
    
    if (finalScore >= 80) {
      category = 'Saudável'
      icon = <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
    } else if (finalScore >= 50) {
      category = 'Em risco'
      icon = <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
    } else {
      category = 'Precisa de ajuda'
      icon = <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
    }

    setResultData({
      score: finalScore,
      category,
      icon
    })
    setShowResult(true)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const isAnswerValid = () => {
    const question = questions[currentQuestion]
    const currentAnswer = answers[question.key]
    
    if (!currentAnswer) return false
    if (question.type === 'multiselect') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0
    }
    if (question.type === 'number') {
      return currentAnswer !== '' && Number(currentAnswer) >= (question.min || 0)
    }
    return true
  }

  if (showResult && resultData) {
    const { score, category, icon } = resultData

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {icon}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Seu Resultado</h1>
          
          <div className="mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-xl font-semibold text-gray-700 mb-2">{category}</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(score)}`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>

          <div className="text-left mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Resultado Básico Gratuito
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {category === 'Saudável' 
                ? '🎉 Parabéns! Seu relacionamento está muito bem!'
                : category === 'Em risco'
                ? '⚠️ Seu relacionamento precisa de atenção em algumas áreas.'
                : '💔 Seu relacionamento está passando por dificuldades.'}
            </p>
            <p className="text-sm text-gray-600">
              Score: <strong>{score}/100</strong> - Categoria: <strong>{category}</strong>
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4 text-lg">Quer o Relatório Completo?</h3>
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Análise detalhada de cada área</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Pontos fortes e fracos identificados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">5 ações práticas para melhorar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Conselhos personalizados</span>
              </div>
            </div>
            <button
              onClick={() => alert('Funcionalidade de compra será implementada em breve!')}
              className="inline-block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Comprar Relatório Completo - R$ 57
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Pagamento seguro • 7 dias de garantia • Acesso imediato
            </p>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const currentAnswer = answers[question.key]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{question.question}</h2>
          {question.type === 'range' && (
            <p className="text-sm text-gray-600">Deslize para escolher de {question.min} a {question.max}</p>
          )}
        </div>

        <div className="mb-8">
          {question.type === 'select' && (
            <select
              value={currentAnswer as string || ''}
              onChange={(e) => handleAnswer(question.key, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            >
              <option value="">Selecione uma opção...</option>
              {question.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}

          {question.type === 'range' && (
            <div>
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={currentAnswer as number || question.min}
                onChange={(e) => handleAnswer(question.key, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{question.min}</span>
                <span className="font-semibold text-pink-500">{currentAnswer as number || question.min}</span>
                <span>{question.max}</span>
              </div>
            </div>
          )}

          {question.type === 'number' && (
            <input
              type="number"
              min={question.min}
              max={question.max}
              value={currentAnswer as string || ''}
              onChange={(e) => handleAnswer(question.key, e.target.value)}
              placeholder={`Digite um número entre ${question.min} e ${question.max}`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            />
          )}

          {question.type === 'multiselect' && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {question.options?.map(option => (
                <label key={option} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={(currentAnswer as string[] || []).includes(option)}
                    onChange={(e) => {
                      const current = currentAnswer as string[] || []
                      if (e.target.checked) {
                        handleAnswer(question.key, [...current, option])
                      } else {
                        handleAnswer(question.key, current.filter((item: string) => item !== option))
                      }
                    }}
                    className="mr-3 w-4 h-4 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <textarea
              value={currentAnswer as string || ''}
              onChange={(e) => handleAnswer(question.key, e.target.value)}
              placeholder="Digite sua resposta..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors resize-none"
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>
          
          <div className="text-xs text-gray-500">
            {!isAnswerValid() && 'Responda para continuar'}
          </div>

          <button
            onClick={nextQuestion}
            disabled={!isAnswerValid()}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed hover:shadow-lg"
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
