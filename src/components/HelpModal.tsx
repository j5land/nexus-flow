import { X, Check, ArrowRight, MousePointer2, Image as ImageIcon, Globe, FileText, Database, Save, Languages, Command } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1b1d21] border border-[#3e4149] rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#3e4149] bg-[#25272c]">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-[#ff6d5a]">Nexus</span>Flow Guide
            </h2>
            <p className="text-gray-400 text-sm mt-1">{t('help.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#3e4149] hover:bg-[#4e5159] text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors"
              title="Switch Language"
            >
              <Languages size={16} />
              <span>{i18n.language === 'en' ? '中文' : 'English'}</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-[#3e4149] rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-gray-300">
          
          {/* Section 1: Getting Started */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MousePointer2 className="text-[#ff6d5a]" size={20} />
              {t('help.sections.navigation.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#2d3036] p-4 rounded-lg border border-[#3e4149]">
                <h4 className="font-medium text-white mb-2">{t('help.sections.navigation.canvasControls')}</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><span className="bg-[#3e4149] px-1.5 rounded text-xs">{t('help.sections.navigation.scroll')}</span> {t('help.sections.navigation.scrollDesc')}</li>
                  <li className="flex items-center gap-2"><span className="bg-[#3e4149] px-1.5 rounded text-xs">{t('help.sections.navigation.pan')}</span> {t('help.sections.navigation.panDesc')}</li>
                  <li className="flex items-center gap-2"><span className="bg-[#3e4149] px-1.5 rounded text-xs">{t('help.sections.navigation.zoom')}</span> {t('help.sections.navigation.zoomDesc')}</li>
                  <li className="flex items-center gap-2"><span className="bg-[#3e4149] px-1.5 rounded text-xs">{t('help.sections.navigation.select')}</span> {t('help.sections.navigation.selectDesc')}</li>
                  <li className="flex items-center gap-2"><span className="bg-[#3e4149] px-1.5 rounded text-xs">{t('help.sections.navigation.delete')}</span> {t('help.sections.navigation.deleteDesc')}</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                {/* Mac Gestures */}
                <div className="bg-[#2d3036] p-4 rounded-lg border border-[#3e4149]">
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <Command size={14} className="text-gray-400" />
                    {t('help.sections.macNavigation.title')}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="bg-[#3e4149] px-1.5 rounded text-xs">{t('help.sections.macNavigation.twoFingerPan')}</span> {t('help.sections.macNavigation.twoFingerPanDesc')}</li>
                    <li className="flex items-center gap-2"><span className="bg-[#3e4149] px-1.5 rounded text-xs">{t('help.sections.macNavigation.pinch')}</span> {t('help.sections.macNavigation.pinchDesc')}</li>
                  </ul>
                </div>

                <div className="bg-[#2d3036] p-4 rounded-lg border border-[#3e4149]">
                  <h4 className="font-medium text-white mb-2">{t('help.sections.navigation.connecting')}</h4>
                  <p className="text-sm mb-2">{t('help.sections.navigation.connectingDesc')}</p>
                  <div className="flex items-center justify-center h-12 bg-[#1b1d21] rounded border border-dashed border-[#3e4149] relative">
                      <div className="w-2 h-2 bg-gray-400 rounded-full absolute left-10"></div>
                      <ArrowRight className="text-[#ff6d5a] animate-pulse" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full absolute right-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Node Types */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Box size={20} className="text-[#3b82f6]" />
              {t('help.sections.nodes.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Image Node */}
              <div className="bg-[#2d3036] p-4 rounded-lg border border-[#3e4149] hover:border-[#ff6d5a] transition-colors group">
                <div className="flex items-center gap-2 mb-3 text-[#ff6d5a]">
                  <ImageIcon size={18} />
                  <span className="font-semibold">{t('help.sections.nodes.image.title')}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {t('help.sections.nodes.image.desc')}
                </p>
                <div className="bg-[#1b1d21] p-2 rounded text-xs text-gray-500 font-mono">
                  {t('help.sections.nodes.image.note')}
                </div>
              </div>

              {/* Browser Node */}
              <div className="bg-[#2d3036] p-4 rounded-lg border border-[#3e4149] hover:border-[#3b82f6] transition-colors group">
                <div className="flex items-center gap-2 mb-3 text-[#3b82f6]">
                  <Globe size={18} />
                  <span className="font-semibold">{t('help.sections.nodes.browser.title')}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {t('help.sections.nodes.browser.desc')}
                </p>
                <div className="bg-[#1b1d21] p-2 rounded text-xs text-gray-500 font-mono">
                  {t('help.sections.nodes.browser.note')}
                </div>
              </div>

              {/* Markdown Node */}
              <div className="bg-[#2d3036] p-4 rounded-lg border border-[#3e4149] hover:border-[#10b981] transition-colors group">
                <div className="flex items-center gap-2 mb-3 text-[#10b981]">
                  <FileText size={18} />
                  <span className="font-semibold">{t('help.sections.nodes.markdown.title')}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {t('help.sections.nodes.markdown.desc')}
                </p>
                <div className="flex gap-2 mt-2">
                    <span className="bg-[#1b1d21] px-1.5 py-0.5 rounded text-[10px] text-gray-400 border border-[#3e4149]">{t('help.sections.nodes.markdown.features.tables')}</span>
                    <span className="bg-[#1b1d21] px-1.5 py-0.5 rounded text-[10px] text-gray-400 border border-[#3e4149]">{t('help.sections.nodes.markdown.features.code')}</span>
                    <span className="bg-[#1b1d21] px-1.5 py-0.5 rounded text-[10px] text-gray-400 border border-[#3e4149]">{t('help.sections.nodes.markdown.features.images')}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Data & Storage */}
          <section className="bg-gradient-to-r from-[#2d3036] to-[#25272c] p-6 rounded-xl border border-[#3e4149]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#1b1d21] rounded-lg border border-[#3e4149]">
                <Database className="text-[#ff6d5a]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{t('help.sections.storage.title')}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {t('help.sections.storage.desc')}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-green-500" />
                    <span>{t('help.sections.storage.privacy')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-green-500" />
                    <span>{t('help.sections.storage.offline')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-green-500" />
                    <span>{t('help.sections.storage.capacity')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-green-500" />
                    <span>{t('help.sections.storage.speed')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#3e4149] bg-[#25272c] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#ff6d5a] hover:bg-[#ff8f7d] text-white rounded-lg font-medium transition-colors shadow-lg shadow-orange-500/20"
          >
            {t('common.gotIt')}
          </button>
        </div>
      </div>
    </div>
  );
}

import { Box } from 'lucide-react';
