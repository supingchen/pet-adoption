import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Dog, Cat, Phone, User, CheckCircle2, Info, Camera, X, Maximize2 } from 'lucide-react';
import { ANIMALS } from './constants';
import { Animal, AnimalType } from './types';

export default function App() {
  const [filter, setFilter] = useState<AnimalType | '全部'>('全部');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [adoptionSuccess, setAdoptionSuccess] = useState(false);
  const [viewingPhoto, setViewingPhoto] = useState<string | null>(null);

  const filteredAnimals = useMemo(() => {
    return filter === '全部' 
      ? ANIMALS 
      : ANIMALS.filter(a => a.type === filter);
  }, [filter]);

  const scrollToContact = (animal?: Animal) => {
    if (animal) setSelectedAnimal(animal);
    const element = document.getElementById('adoption-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdoptionSuccess(true);
    setTimeout(() => setAdoptionSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen selection:bg-warm-accent selection:text-white">
      {/* Hero Section */}
      <header className="relative py-20 px-6 text-center bg-warm-soft overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-warm-olive blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-warm-accent blur-3xl animate-pulse delay-700" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-accent/10 text-warm-accent font-medium mb-6"
          >
            <Heart size={18} fill="currentColor" />
            <span>用愛心，讓生命延續</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-warm-olive mb-6 leading-tight">
            尋找你的 <span className="text-warm-accent italic underline decoration-wavy underline-offset-8">命定萌寵</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed font-sans">
            在這裡，每一個渴望被愛的眼神都在等待一個溫暖的歸宿。<br />
            點點滑鼠，開啟你與毛孩的美好相遇。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {(['全部', '狗', '貓'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 font-medium
                  ${filter === type 
                    ? 'bg-warm-olive text-white shadow-lg shadow-warm-olive/20 scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}
                `}
              >
                {type === '全部' && <Info size={18} />}
                {type === '狗' && <Dog size={18} />}
                {type === '貓' && <Cat size={18} />}
                {type}
              </button>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Gallery Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAnimals.map((animal, index) => (
              <motion.div
                key={animal.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col relative"
              >
                <div 
                  className="relative aspect-[4/3] overflow-hidden cursor-zoom-in active:scale-95 transition-transform"
                  onClick={() => setViewingPhoto(animal.image)}
                >
                  <img 
                    src={animal.image} 
                    alt={animal.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* ID Card Aesthetic Elements */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <div className="bg-warm-olive/10 backdrop-blur-sm border border-warm-olive/20 px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <Camera size={10} className="text-warm-olive" />
                      <p className="text-[10px] font-bold text-warm-olive uppercase tracking-[0.2em]">ID: {animal.id.padStart(4, '0')}</p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-warm-olive shadow-sm">
                    {animal.age}
                  </div>

                  {/* View Full Photo Badge */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Maximize2 size={24} className="text-warm-olive" />
                    </motion.div>
                  </div>
                  
                  {/* Overlay for 'Photo Identity' feel */}
                  <div className="absolute inset-0 border-[12px] border-white/10 pointer-events-none" />
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-serif font-bold text-warm-olive">{animal.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${animal.gender === '公' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                      {animal.gender}性
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {animal.personality.map(trait => (
                      <span key={trait} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                        #{trait}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">
                    {animal.description}
                  </p>

                  <div className="pt-6 border-t border-gray-50 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle2 size={14} className="text-green-500" />
                      <span>健康狀況：{animal.health}</span>
                    </div>
                    
                    <button 
                      onClick={() => scrollToContact(animal)}
                      className="w-full py-3 bg-warm-soft text-warm-olive border border-warm-olive/10 rounded-2xl font-bold hover:bg-warm-olive hover:text-white transition-all duration-300"
                    >
                      我想認養 {animal.name}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Adoption Form Section */}
      <section id="adoption-form" className="py-24 bg-warm-olive text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-warm-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">攜手給牠一個溫暖的家</h2>
            <p className="text-warm-cream/70">請留下您的資訊，我們會盡快與您聯繫安排互動。</p>
          </div>

          <div className="bg-white rounded-[3rem] p-10 md:p-16 text-gray-800 shadow-2xl">
            {adoptionSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-warm-olive">感謝您的愛心！</h3>
                <p className="text-gray-500">我們已收到您的資訊，志工會盡快聯繫您。</p>
                <button 
                  onClick={() => setAdoptionSuccess(false)}
                  className="mt-8 text-warm-accent font-medium hover:underline"
                >
                  回填資訊
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 flex items-center gap-2 ml-1">
                      <User size={14} /> 姓名
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="如何稱呼您？"
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-warm-accent focus:ring-4 focus:ring-warm-accent/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 flex items-center gap-2 ml-1">
                      <Phone size={14} /> 電話
                    </label>
                    <input 
                      required
                      type="tel" 
                      placeholder="您的聯繫電話"
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-warm-accent focus:ring-4 focus:ring-warm-accent/10 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 flex items-center gap-2 ml-1">
                    <Heart size={14} /> 想認養的對象
                  </label>
                  <select 
                    value={selectedAnimal?.name || ''}
                    onChange={(e) => {
                      const found = ANIMALS.find(a => a.name === e.target.value);
                      if (found) setSelectedAnimal(found);
                    }}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-warm-accent focus:ring-4 focus:ring-warm-accent/10 outline-none transition-all appearance-none"
                  >
                    <option value="" disabled>請選擇心儀的毛孩</option>
                    {ANIMALS.map(a => (
                      <option key={a.id} value={a.name}>{a.name} ({a.type})</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-5 bg-warm-accent text-white rounded-2xl font-bold text-lg shadow-xl shadow-warm-accent/20 hover:bg-warm-accent/90 transform hover:-translate-y-1 transition-all active:scale-[0.98]"
                  >
                    提交認養意願
                  </button>
                </div>
                
                <p className="text-center text-xs text-gray-400 mt-6 italic">
                  * 認養並非一時衝動，請確保您已做好終身照護的心理準備。
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {viewingPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setViewingPhoto(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setViewingPhoto(null)}
            >
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={viewingPhoto}
              alt="動物大圖"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 bg-warm-cream border-t border-gray-200 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 text-warm-olive font-serif font-bold text-xl mb-4">
            <div className="w-8 h-8 bg-warm-olive rounded-lg flex items-center justify-center text-white">
              <Heart size={16} fill="currentColor" />
            </div>
            萌寵家園
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 萌寵家園 - 溫馨認養平台. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
