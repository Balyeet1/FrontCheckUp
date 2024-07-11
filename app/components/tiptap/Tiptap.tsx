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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faHeading, faItalic, faStrikethrough, faUnderline, faCode, faList, faList12, faImage, faFont, faHighlighter, faAlignCenter, faAlignLeft, faAlignRight, faPalette, faEraser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '@/app/components/ui_utils/GenericDroppdown';

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

    const itemsHeader = [
        { label: "H1", value: 1, },
        { label: "H2", value: 2 },
        { label: "H3", value: 3 },
    ]

    const itemsFontColor = [
        { label: "Red", value: "#FF0000", },
        { label: "Blue", value: "#0000FF" },
        { label: "Yellow", value: "#FFFF00" },
        { label: "Lime", value: "#00FF00" },
        { label: "Green", value: "#008000" },
        { label: "Cyan", value: "#00FFFF" },
        { label: "Black", value: "#000000", icon: <FontAwesomeIcon icon={faEraser} /> },
    ]

    const itemsFontFamily = [
        { label: "Arial", value: "arial" },
        { label: "Monospace", value: "monospace" },
        { label: "Serif", value: "serif" },
        { label: "Comic", value: "Comic Sans MS, Comic Sans" },
        { label: "Inter", value: "inter" },
        { label: "Cursive", value: "cursive" },
    ]

    const itemsAlignment = [
        { label: "Left", value: "left", icon: <FontAwesomeIcon icon={faAlignLeft} /> },
        { label: "Center", value: "center", icon: <FontAwesomeIcon icon={faAlignCenter} /> },
        { label: "Right", value: "right", icon: <FontAwesomeIcon icon={faAlignRight} /> },
    ]

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

    const getHeader = (): number => {
        return editor.isActive('heading', { level: 1 }) ? 1
            : editor.isActive('heading', { level: 2 }) ? 2
                : editor.isActive('heading', { level: 3 }) ? 3
                    : 0
    }


    return (
        <div className="flex justify-between border border-white cols-3 grid grid-cols-6 sm:grid-cols-10 gap-2 sticky top-0 z-10 items-center toolbar p-3">
            <button onClick={addImage}>
                <FontAwesomeIcon icon={faImage} />
            </button>
            <Dropdown
                selectedLabel={getAlignement()}
                placeholder="Align" items={itemsAlignment}
                onSelect={(item) => editor.chain().focus().setTextAlign(item.value).run()}
            />
            <Dropdown
                className={editor.isActive("heading") ? 'is-active' : ""}
                selectedLabel={getHeader()}
                placeholder={faHeading}
                items={itemsHeader}
                onSelect={(item) => editor.chain().focus().toggleHeading({ level: item.value }).run()}
            />
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <FontAwesomeIcon icon={faBold} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <FontAwesomeIcon icon={faStrikethrough} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <FontAwesomeIcon icon={faUnderline} />
            </button>
            <Dropdown
                placeholder={faPalette}
                items={itemsFontColor}
                onSelect={(item) => editor.chain().focus().setColor(item.value).run()}
            />
            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive('highlight') ? 'is-active' : ''}
            >
                <FontAwesomeIcon icon={faHighlighter} />
            </button>
            <select
                className={editor.isActive('highlight') ? 'is-active bg-transparent' : 'bg-transparent'}
                onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
                value={"HighLight"}
            >
                <option value="">Highlight</option>
                <option value="Yellow">Yellow</option>
                <option value="#8ce99a">Green</option>
                <option value="#74c0fc">Blue</option>
                <option value="#ffa8a8">Red</option>
            </select>


            <Dropdown
                className={editor.getAttributes('textStyle').fontFamily ? 'is-active' : ""}
                selectedLabel={editor.getAttributes('textStyle').fontFamily ? editor.getAttributes('textStyle').fontFamily : "arial"}
                placeholder={faFont}
                items={itemsFontFamily}
                onSelect={(item) => editor.chain().focus().setFontFamily(item.value).run()}
            />

            <select
                className='is-active'
                onChange={(e) => {
                    editor.chain().focus().setFontSize(e.target.value).run()
                }}
                value={editor.isActive('textStyle') ? editor.getAttributes('textStyle').fontSize : '1rem'}
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
                <FontAwesomeIcon icon={faList} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <FontAwesomeIcon icon={faList12} />
            </button>
            <button
                onClick={() => editor.chain().focus().setCodeBlock().run()}
                disabled={editor.isActive('codeBlock')}
            >
                <FontAwesomeIcon icon={faCode} />
            </button>

        </div>
    )
}

export default Tiptap
