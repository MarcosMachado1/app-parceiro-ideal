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
  // ... (todo o array de perguntas permanece igual)
]

export default function Quiz() {
  // ... (todo o código anterior permanece igual até a função showResult)

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center border border-gray-200">
          
          {/* ... (todo o conteúdo anterior permanece igual) */}

          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 mb-6 border-2 border-blue-300 shadow-xl">
            {/* ... (todo o conteúdo anterior permanece igual) */}

            <a
              href="https://pay.kiwify.com.br/LnKRt9G"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // DISPARA O EVENTO AddToCart DO FACEBOOK PIXEL
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('track', 'AddToCart', {
                    value: 57.00,
                    currency: 'BRL',
                    content_name: 'Relatório Completo Parceiro Ideal',
                    content_type: 'product'
                  });
                }
                // O link normal da tag <a> já fará o redirecionamento para a Kiwify
              }}
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

  // ... (o restante do código permanece igual)
}
