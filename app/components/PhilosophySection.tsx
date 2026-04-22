
import React from 'react';
import { Leaf, Sparkles, Heart } from 'lucide-react';
import { PhilosophyCard } from './PhilosophyCard';

export default function PhilosophySection() {
  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Philosophy
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three principles guide everything we create
          </p>
        </div>

        <div className="space-y-8">
          <PhilosophyCard
            index={0}
            isVisible={true}
            icon={<Leaf className="w-6 h-6" />}
            title="Herbality"
            quote="From earth's embrace, healing grace."
            description="Our formulations draw from centuries-old botanical wisdom, using only the purest herbs and plants that nature intended for our wellbeing."
            imageUrl="/logo/logo_without_text_bgremove.png"
            color="emerald"
          />

          <PhilosophyCard
            index={1}
            isVisible={true}
            icon={<Sparkles className="w-6 h-6" />}
            title="Purity"
            quote="Clean ingredients, clear conscience."
            description="We believe in transparency. Every ingredient is natural, ethically sourced, and free from harmful chemicals. What you see is what you get—pure and simple."
            imageUrl="/logo/logo_without_text_bgremove.png"
            color="blue"
          />

          <PhilosophyCard
            index={2}
            isVisible={true}
            icon={<Heart className="w-6 h-6" />}
            title="Humanity"
            quote="Care crafted with compassion."
            description="Beyond products, we create connections. Our commitment extends to ethical practices, sustainable sourcing, and supporting communities that help us bring nature's best to you."
            imageUrl="/logo/logo_without_text_bgremove.png"
            color="amber"
          />
        </div>
      </div>
    </section>
  );
}
