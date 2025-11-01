
import React from 'react';

interface QuickFeaturesProps {
  onFeatureSelect: (feature: string) => void;
  disabled: boolean;
  onSwitchLanguage: () => void;
}

const features = ['Biography', 'Famous Works', 'Quotes', 'Awards', 'Influence'];

export const QuickFeatures: React.FC<QuickFeaturesProps> = ({ onFeatureSelect, disabled, onSwitchLanguage }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {features.map((feature) => (
        <button
          key={feature}
          onClick={() => onFeatureSelect(`Tell me about Masti Venkatesha Iyengar's ${feature.toLowerCase()}`)}
          disabled={disabled}
          className="px-4 py-2 text-sm font-medium text-white bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {feature}
        </button>
      ))}
      <button
        onClick={onSwitchLanguage}
        disabled={disabled}
        className="px-4 py-2 text-sm font-medium text-white bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Switch Language
      </button>
    </div>
  );
};
