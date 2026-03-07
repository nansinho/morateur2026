'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useMemo } from 'react'
import {
  X, RefreshCw, Shield, Check,
  Plane, Heart, Star, Sun, Moon, Home,
  TreePine, Flower2, Music, Camera, Clock, Lock,
  Umbrella, Bell, Cloud, Fish, Mountain, Rocket,
  Key, BookOpen, Flag, Zap, Crown, Anchor,
} from 'lucide-react'

const ICON_POOL = [
  { name: 'avion', icon: Plane },
  { name: 'coeur', icon: Heart },
  { name: 'étoile', icon: Star },
  { name: 'soleil', icon: Sun },
  { name: 'lune', icon: Moon },
  { name: 'maison', icon: Home },
  { name: 'arbre', icon: TreePine },
  { name: 'fleur', icon: Flower2 },
  { name: 'musique', icon: Music },
  { name: 'caméra', icon: Camera },
  { name: 'horloge', icon: Clock },
  { name: 'cadenas', icon: Lock },
  { name: 'parapluie', icon: Umbrella },
  { name: 'cloche', icon: Bell },
  { name: 'nuage', icon: Cloud },
  { name: 'poisson', icon: Fish },
  { name: 'montagne', icon: Mountain },
  { name: 'fusée', icon: Rocket },
  { name: 'clé', icon: Key },
  { name: 'livre', icon: BookOpen },
  { name: 'drapeau', icon: Flag },
  { name: 'éclair', icon: Zap },
  { name: 'couronne', icon: Crown },
  { name: 'ancre', icon: Anchor },
] as const

interface RoundData {
  gridIcons: typeof ICON_POOL[number][]
  targetIndex: number
}

function generateRound(): RoundData {
  const shuffled = [...ICON_POOL].sort(() => Math.random() - 0.5)
  const gridIcons = shuffled.slice(0, 9)
  const targetIndex = Math.floor(Math.random() * 9)
  return { gridIcons, targetIndex }
}

interface IconCaptchaProps {
  isOpen: boolean
  onSuccess: () => void
  onClose: () => void
}

const TOTAL_ROUNDS = 2

const IconCaptcha = ({ isOpen, onSuccess, onClose }: IconCaptchaProps) => {
  const [currentRound, setCurrentRound] = useState(0)
  const [rounds, setRounds] = useState<RoundData[]>(() => [generateRound(), generateRound()])
  const [wrongIndex, setWrongIndex] = useState<number | null>(null)
  const [correctIndex, setCorrectIndex] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const round = rounds[currentRound]
  const targetName = useMemo(() => round?.gridIcons[round.targetIndex]?.name ?? '', [round])

  const regenerate = useCallback(() => {
    setRounds(prev => {
      const next = [...prev]
      next[currentRound] = generateRound()
      return next
    })
    setWrongIndex(null)
    setCorrectIndex(null)
  }, [currentRound])

  const reset = useCallback(() => {
    setCurrentRound(0)
    setRounds([generateRound(), generateRound()])
    setWrongIndex(null)
    setCorrectIndex(null)
    setIsComplete(false)
  }, [])

  const handleIconClick = useCallback((index: number) => {
    if (correctIndex !== null || isComplete) return

    if (index === round.targetIndex) {
      setCorrectIndex(index)
      setWrongIndex(null)

      setTimeout(() => {
        if (currentRound + 1 >= TOTAL_ROUNDS) {
          setIsComplete(true)
          setTimeout(() => {
            onSuccess()
            reset()
          }, 600)
        } else {
          setCurrentRound(prev => prev + 1)
          setCorrectIndex(null)
        }
      }, 500)
    } else {
      setWrongIndex(index)
      setTimeout(() => {
        setWrongIndex(null)
        regenerate()
      }, 600)
    }
  }, [round, currentRound, correctIndex, isComplete, onSuccess, reset, regenerate])

  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [reset, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-sm rounded-3xl border border-white/[0.12] overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(160deg, rgba(20,35,60,0.98), rgba(10,20,40,0.98))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-campaign-lime/10 border border-campaign-lime/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-campaign-lime" />
                </div>
                <h3 className="font-accent font-extrabold text-white text-base uppercase tracking-wide">
                  Vérification
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg border border-white/10 text-white/40 flex items-center justify-center hover:border-white/30 hover:text-white/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 py-3">
              {Array.from({ length: TOTAL_ROUNDS }, (_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i < currentRound || isComplete
                      ? 'bg-campaign-lime shadow-[0_0_8px_hsl(152_48%_50%/0.5)]'
                      : i === currentRound
                      ? 'bg-campaign-lime/60 border border-campaign-lime'
                      : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/40 text-xs text-center mb-3">
              Étape {Math.min(currentRound + 1, TOTAL_ROUNDS)} sur {TOTAL_ROUNDS}
            </p>

            {isComplete ? (
              /* Success state */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center py-10 px-6"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-16 h-16 rounded-full bg-campaign-lime/20 border-2 border-campaign-lime flex items-center justify-center mb-4"
                >
                  <Check className="w-8 h-8 text-campaign-lime" />
                </motion.div>
                <p className="text-white font-bold text-lg">Vérifié !</p>
                <p className="text-white/40 text-sm">Envoi en cours...</p>
              </motion.div>
            ) : (
              <>
                {/* Instruction */}
                <div className="mx-6 mb-4 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
                  {(() => {
                    const TargetIcon = round.gridIcons[round.targetIndex].icon
                    return <TargetIcon className="w-5 h-5 text-campaign-lime flex-shrink-0" />
                  })()}
                  <p className="text-white/80 text-sm">
                    Cliquez sur : <strong className="text-campaign-lime font-bold">{targetName}</strong>
                  </p>
                  <button
                    onClick={regenerate}
                    className="ml-auto text-white/30 hover:text-white/60 transition-colors flex-shrink-0"
                    title="Nouvelles icônes"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* 3x3 Grid */}
                <div className="px-6 pb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentRound}-${round.gridIcons.map(i => i.name).join()}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-3 gap-2.5"
                    >
                      {round.gridIcons.map((item, i) => {
                        const Icon = item.icon
                        const isWrong = wrongIndex === i
                        const isCorrect = correctIndex === i

                        return (
                          <motion.button
                            key={`${item.name}-${i}`}
                            type="button"
                            onClick={() => handleIconClick(i)}
                            className={`aspect-square rounded-2xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                              isCorrect
                                ? 'bg-campaign-lime/20 border-campaign-lime shadow-[0_0_20px_hsl(152_48%_50%/0.3)]'
                                : isWrong
                                ? 'bg-red-500/20 border-red-500'
                                : 'bg-white/[0.04] border-white/[0.10] hover:border-campaign-lime/40 hover:bg-campaign-lime/[0.06]'
                            }`}
                            whileHover={!isCorrect && !isWrong ? { scale: 1.05 } : {}}
                            whileTap={!isCorrect && !isWrong ? { scale: 0.95 } : {}}
                            animate={
                              isWrong
                                ? { x: [0, -6, 6, -6, 6, 0] }
                                : isCorrect
                                ? { scale: [1, 1.1, 1] }
                                : {}
                            }
                            transition={{ duration: 0.4 }}
                            aria-label={`Option ${i + 1}`}
                          >
                            <Icon className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-200 ${
                              isCorrect
                                ? 'text-campaign-lime'
                                : isWrong
                                ? 'text-red-400'
                                : 'text-white/60'
                            }`} />
                          </motion.button>
                        )
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* Footer */}
            <div className="px-6 pb-5 pt-1">
              <p className="text-white/20 text-[11px] text-center">
                Vérification de sécurité Morateur 2026
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IconCaptcha
