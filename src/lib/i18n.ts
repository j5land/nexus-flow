import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          common: {
            loading: 'Loading Workspace...',
            selectBoard: 'Select a board to start',
            version: 'v1.0.0',
            help: 'Help',
            gotIt: 'Got it',
            cancel: 'Cancel',
            confirm: 'Confirm',
            delete: 'Delete',
            save: 'Save',
            edit: 'Edit',
            image: 'Image',
            browser: 'Browser',
            markdown: 'Markdown',
            add: 'Add',
            workspaces: 'Workspaces',
            createBoard: 'Create New Board',
            boardNamePlaceholder: 'Board Name...',
            deleteBoardConfirm: 'Are you sure you want to delete this board?',
          },
          help: {
            title: 'NexusFlow Guide',
            subtitle: 'Master your flow presentation tool',
            sections: {
              navigation: {
                title: 'Basic Navigation',
                canvasControls: 'Canvas Controls',
                scroll: 'Scroll',
                scrollDesc: 'Pan vertically (use Shift for horizontal)',
                zoom: 'Ctrl/Cmd + Scroll',
                zoomDesc: 'Zoom in/out',
                select: 'Click + Drag',
                selectDesc: 'Select multiple nodes',
                pan: 'Space + Drag',
                panDesc: 'Pan around the canvas',
                delete: 'Backspace / Delete',
                deleteDesc: 'Delete selected nodes',
                connecting: 'Connecting Nodes',
                connectingDesc: 'Drag from one handle to another to create a connection.',
              },
              macNavigation: {
                title: 'Mac Trackpad Gestures',
                pinch: 'Pinch',
                pinchDesc: 'Zoom in/out',
                twoFingerPan: 'Two-finger Drag',
                twoFingerPanDesc: 'Pan around the canvas',
              },
              nodes: {
                title: 'Node Types',
                image: {
                  title: 'Image Node',
                  desc: 'Upload and display high-res images. Supports resizing and drag-and-drop.',
                  note: 'Supports: PNG, JPG, GIF, WEBP',
                },
                browser: {
                  title: 'Browser Node',
                  desc: 'Embed live websites via IFrame. Perfect for showing documentation or live demos.',
                  note: 'Note: Some sites block IFrames',
                },
                markdown: {
                  title: 'Markdown Node',
                  desc: 'Rich text editor with support for GFM (tables, code blocks, math).',
                  features: {
                    tables: 'Tables',
                    code: 'Code',
                    images: 'Images',
                  },
                },
              },
              storage: {
                title: 'Local-First Storage',
                desc: 'Your data is stored locally in your browser using IndexedDB. This means:',
                privacy: 'No data leaves your device',
                offline: 'Works offline',
                capacity: 'Unlimited storage capacity',
                speed: 'Fast load times',
              },
              shortcuts: {
                title: 'Keyboard Shortcuts',
                save: 'Ctrl + S',
                saveDesc: 'Quick save current changes',
                undo: 'Ctrl + Z',
                undoDesc: 'Undo last action',
                redo: 'Ctrl + Y',
                redoDesc: 'Redo last action',
                copy: 'Ctrl + C',
                copyDesc: 'Copy selected nodes',
                paste: 'Ctrl + V',
                pasteDesc: 'Paste nodes',
              }
            },
          },
          nodes: {
            image: {
              upload: 'Click to upload image',
              drag: 'or drag and drop',
            },
            browser: {
              placeholder: 'Enter URL (e.g. https://example.com)',
              openExternal: 'Open External',
            },
            markdown: {
              placeholder: 'Type your markdown here...',
              doubleClick: 'Double click to edit',
            }
          }
        }
      },
      zh: {
        translation: {
          common: {
            loading: '正在加载工作区...',
            selectBoard: '请选择一个看板以开始',
            version: 'v1.0.0',
            help: '帮助',
            gotIt: '知道了',
            cancel: '取消',
            confirm: '确认',
            delete: '删除',
            save: '保存',
            edit: '编辑',
            image: '图片',
            browser: '浏览器',
            markdown: '文本',
            add: '添加',
            workspaces: '工作区',
            createBoard: '创建新看板',
            boardNamePlaceholder: '看板名称...',
            deleteBoardConfirm: '确定要删除这个看板吗？',
          },
          help: {
            title: 'NexusFlow 使用指南',
            subtitle: '掌握您的流程演示工具',
            sections: {
              navigation: {
                title: '基础操作',
                canvasControls: '画布控制',
                scroll: '鼠标滚轮',
                scrollDesc: '垂直移动 (按住 Shift 水平移动)',
                zoom: 'Ctrl/Cmd + 滚轮',
                zoomDesc: '缩放视图',
                select: '点击 + 拖拽',
                selectDesc: '框选多个节点',
                pan: '空格 + 拖拽',
                panDesc: '自由平移画布',
                delete: 'Backspace / Delete',
                deleteDesc: '删除选中节点',
                connecting: '连接节点',
                connectingDesc: '拖拽节点边缘的手柄到另一个节点即可创建连接线。',
              },
              macNavigation: {
                title: 'Mac 触控板手势',
                pinch: '双指捏合',
                pinchDesc: '缩放视图',
                twoFingerPan: '双指拖拽',
                twoFingerPanDesc: '自由平移画布',
              },
              nodes: {
                title: '节点类型',
                image: {
                  title: '图片节点',
                  desc: '上传并展示高清图片。支持自由调整大小和拖拽上传。',
                  note: '支持格式: PNG, JPG, GIF, WEBP',
                },
                browser: {
                  title: '浏览器节点',
                  desc: '通过 IFrame 嵌入实时网页。非常适合展示文档或在线演示。',
                  note: '注意：部分网站可能会拦截 IFrame 嵌入',
                },
                markdown: {
                  title: 'Markdown 节点',
                  desc: '富文本编辑器，支持 GFM 语法（表格、代码块、数学公式）。',
                  features: {
                    tables: '表格',
                    code: '代码块',
                    images: '图片',
                  },
                },
              },
              storage: {
                title: '本地优先存储',
                desc: '您的数据通过 IndexedDB 存储在本地浏览器中。这意味着：',
                privacy: '数据绝不上传云端',
                offline: '完全支持离线使用',
                capacity: '无限制存储容量',
                speed: '极速加载体验',
              },
              shortcuts: {
                title: '快捷键',
                save: 'Ctrl + S',
                saveDesc: '快速保存更改',
                undo: 'Ctrl + Z',
                undoDesc: '撤销上一步',
                redo: 'Ctrl + Y',
                redoDesc: '重做',
                copy: 'Ctrl + C',
                copyDesc: '复制选中节点',
                paste: 'Ctrl + V',
                pasteDesc: '粘贴节点',
              }
            },
          },
          nodes: {
            image: {
              upload: '点击上传图片',
              drag: '或拖拽文件到此处',
            },
            browser: {
              placeholder: '输入网址 (如 https://example.com)',
              openExternal: '外部打开',
            },
            markdown: {
              placeholder: '在此输入 Markdown 内容...',
              doubleClick: '双击进行编辑',
            }
          }
        }
      }
    }
  });

export default i18n;
