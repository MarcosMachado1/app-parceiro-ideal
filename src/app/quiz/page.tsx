'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Heart, Star, CheckCircle, AlertCircle } from 'lucide-react'

// ... (as interfaces e array de questions permanecem iguais)

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer>({})
  const [showResult, setShowResult] = useState(false)
  const [resultData, setResultData] = useState<{score: number, category: string, icon: JSX.Element} | null>(null)

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
    let description = ''
    let icon: JSX.Element
    
    if (finalScore >= 80) {
      category = 'Saudável'
      description = 'Seu relacionamento está em ótimo estado! Continue cultivando o amor e a comunicação.'
      icon = <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
    } else if (finalScore >= 50) {
      category = 'Em risco'
      description = 'Seu relacionamento precisa de atenção em algumas áreas. Há espaço para melhorias.'
      icon = <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
    } else {
      category = 'Precisa de ajuda'
      description = 'Seu relacionamento está passando por dificuldades. É importante buscar ajuda e diálogo.'
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

  // ... (resto do código permanece igual)
}
