import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Parceiro Ideal</h1>
          <p className="text-gray-600">Descubra a saúde do seu relacionamento</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="text-left">
            <h2 className="font-semibold text-gray-800 mb-2">O que você vai descobrir:</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Score de compatibilidade (0-100)</li>
              <li>• Análise por dimensões</li>
              <li>• Pontos fortes e fracos</li>
              <li>• Dicas personalizadas</li>
            </ul>
          </div>
        </div>

        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Começar Quiz
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-xs text-gray-500 mt-4">
          Resultado básico gratuito • Relatório completo por R$ 57
        </p>
      </div>
    </div>
  )
}