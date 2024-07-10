import { useEditor, EditorContent, Editor } from '@tiptap/react'
import { createLowlight } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import getImageExtension from "@/app/components/tiptap/customImage"
import TextAlign from '@tiptap/extension-text-align'
import js from 'highlight.js/lib/languages/javascript'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import { SmilieReplacer } from '@/app/components/tiptap/smilieReplacer';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style'
import FontSize from 'tiptap-extension-font-size';
import Dropcursor from '@tiptap/extension-dropcursor'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import ListItem from '@tiptap/extension-list-item';
import History from '@tiptap/extension-history'
import { Color } from '@tiptap/extension-color'

const Tiptap = ({ className, content, onChange, isReadonly }: { className?: string, content?: string, onChange?: any, isReadonly: boolean }) => {

    const CustomDocument = Document.extend({
        content: 'heading block*',
    })

    const lowlight = createLowlight()
    lowlight.register("js", js)

    const editor = useEditor({
        editable: !isReadonly,
        editorProps: { attributes: { class: className + " w-full table" || "w-full table" } },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        extensions: [
            // Core Extensions
            SmilieReplacer, TextStyle, FontSize, CustomDocument, Paragraph, Text, OrderedList, BulletList, Heading, Bold, Italic, Strike, Underline, ListItem, History, Color,

            // Extensions with configs

            getImageExtension(isReadonly),

            Highlight.configure({ multicolor: true }),

            FontFamily.configure({ types: ['textStyle'] }),

            Placeholder.configure({
                placeholder: ({ node }) => node.type.name === 'heading' ? 'What’s the title?' : '',
            }),

            CodeBlockLowlight.configure({ lowlight }),

            TextAlign.configure({ types: ['heading', 'paragraph'] }),

            Dropcursor.configure({ color: '#ff0000', width: 1 }),

        ],
        content,
    });

    if (!editor) {
        return null
    }

    return (
        <div>
            {!isReadonly && <Toolbar editor={editor} />}
            <EditorContent editor={editor} className='mt-4 mb-4' />
        </div >
    )
}


const Toolbar = ({ editor }: { editor: Editor }) => {

    const addImage = () => {
        const url = window.prompt('URL')
        const commands: any = editor.commands

        commands.setImage({ src: url })
    }

    const getAlignement = (): string => {
        return editor.isActive({ textAlign: 'left' }) ? 'left'
            : editor.isActive({ textAlign: 'center' }) ? 'center'
                : editor.isActive({ textAlign: 'right' }) ? 'right'
                    : "left"
    }


    return (
        <div className="flex justify-between border border-white mb-5 cols-3 grid grid-cols-8 gap-2 sticky top-0 z-10 items-center toolbar">
            <button onClick={addImage}>Add image</button>
            <select
                className='is-active'
                onChange={(e) => editor.chain().focus().setTextAlign(e.target.value).run()}
                value={getAlignement()}
            >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
            </select>
            <button
                onClick={() => editor.chain().focus().setCodeBlock().run()}
                disabled={editor.isActive('codeBlock')}
            >
                Set code block
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
                H1
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
                H2
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
                H3
            </button>
            <button
                onClick={() => editor.chain().focus().setColor("#000000").run()}
                className={editor.isActive('textStyle', { color: '#000000' }) ? 'is-active' : ''}
                data-testid="setBlack"
            >
               Black 
            </button>
            <button
                onClick={() => editor.chain().focus().setColor('#F98181').run()}
                className={editor.isActive('textStyle', { color: '#F98181' }) ? 'is-active' : ''}
                data-testid="setRed"
            >
                Red
            </button>
            <button
                onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
                className={editor.isActive('textStyle', { color: '#FBBC88' }) ? 'is-active' : ''}
                data-testid="setOrange"
            >
                Orange
            </button>
            <button
                onClick={() => editor.chain().focus().setColor('#FAF594').run()}
                className={editor.isActive('textStyle', { color: '#FAF594' }) ? 'is-active' : ''}
                data-testid="setYellow"
            >
                Yellow
            </button>
            <button
                onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
                className={editor.isActive('textStyle', { color: '#70CFF8' }) ? 'is-active' : ''}
                data-testid="setBlue"
            >
                Blue
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive('highlight') ? 'is-active' : ''}
            >
                Toggle highlight
            </button>
            <select
                className={editor.isActive('highlight') ? 'is-active' : ''}
                onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
                value={"HighLight"}
            >
                <option value="">Highlight</option>
                <option value="Yellow">Yellow</option>
                <option value="#8ce99a">Green</option>
                <option value="#74c0fc">Blue</option>
                <option value="#ffa8a8">Red</option>
            </select>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                Strike
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                Toggle underline
            </button>
            <select
                className='is-active'
                onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                value={editor.isActive('textStyle') ? editor.getAttributes('textStyle').fontFamily : 'monospace'} // Default to 16pt if not active
            >
                <option value="monospace">Monospace</option>
                <option value="serif">Serif</option>
                <option value="Comic Sans MS, Comic Sans">Comic Sans</option>
                <option value="inter">Inter</option>
            </select>

            <select
                className='is-active'
                onChange={(e) => {
                    editor.chain().focus().setFontSize(e.target.value).run()
                }}
                value={editor.isActive('textStyle') ? editor.getAttributes('textStyle').fontSize : '1rem'} // Default to 16pt if not active
            >
                <option value="0.6rem">10pt</option>
                <option value="0.8rem">12pt</option>
                <option value="1rem">14pt</option>
                <option value="1.2rem">16pt</option>
                <option value="1.4rem">18pt</option>
                <option value="1.6rem">20pt</option>
                <option value="1.8rem">22pt</option>
                <option value="2rem">24pt</option>
            </select>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                Bullet list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                Order list
            </button>

        </div>
    )
}

export default Tiptap
