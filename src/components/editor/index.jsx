import "./style.css";
import React from "react";
import { stateToHTML } from "draft-js-export-html";
import "../../../node_modules/draft-js/dist/Draft.css";
import {
  Editor,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
  ContentState,
  convertFromHTML,
} from "draft-js";

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, "kokok");
    this.onPaste = this.onPaste.bind(this);
    let overview = props?.userDetails?.description
      ? props?.userDetails?.description
      : props?.userDetails
      ? props?.userDetails
      : "<p></p>";

    if (props?.userDetails?.description === null) {
      console.log("arajin");
      overview = "<p></p>";
      // overview = props?.userDetails?.description;
    } else if (props.userDetails && !props.userDetails?.description) {
      console.log("erkrord");
      overview = props?.userDetails ? props.userDetails : "<p></p>";
      console.log(overview, "over");
    } else if (props.userDetails?.description) {
      console.log("erkrord nulll");
      overview = props.userDetails?.description;
    } else {
      console.log("errord");
      overview = "<p></p>";
    }

    // console.log(overview, "overerer");
    // console.log(overview, "l");
    const contentDataState = ContentState.createFromBlockArray(
      props.over
        ? convertFromHTML(
            overview?.description ? overview?.description : "<p></p>"
          )
        : convertFromHTML(overview ? overview : "<p></p>")
      // Ensure overview is not empty
    );

    // console.log(overview, "overwiew");
    // const contentDataState = ContentState.createFromBlockArray(
    //   convertFromHTML(overview)
    // );

    const editorDataState = EditorState.createWithContent(contentDataState);

    this.state = {
      editorState: editorDataState,
    };

    this.focus = () => this.refs.editor.focus();
    // this.onChange = (editorState) => {
    //   this.setState({ editorState });
    //   const contentState = editorState.getCurrentContent();
    //   const html = stateToHTML(contentState);

    //   // Check if html is a string or convert it to a string
    //   const trimmedHTML = typeof html === "string" ? html.trim() : String(html);

    //   props.setUserDetails({ ...props.userDetails, description: trimmedHTML });
    // };
    this.onChange = (editorState) => {
      this.setState({ editorState });
      const contentState = editorState.getCurrentContent();
      const html = stateToHTML(contentState);

      console.log("HTML before trim:", html);

      // Check if html is a string or convert it to a string
      const trimmedHTML = typeof html === "string" ? html.trim() : String(html);

      props.setUserDetails({
        ...props.userDetails,
        description: trimmedHTML || "<p></p>", // Provide a default value if trimmedHTML is falsy
      });
    };
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  onEditorStateChange = (editorStateData) => {
    this.setState({ editorState: editorStateData });
  };
  _handleKeyCommand(command, editorState) {
    if (command === "split-block") {
      // Insert <p><br></p> when Enter key is pressed
      this.onChange(RichUtils.insertSoftNewline(editorState));
      return true;
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  onPaste() {
    setTimeout(() => {
      const editorState = this.state.editorState;
      const currentContent = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();

      // Check if the selection is collapsed
      if (!selectionState.isCollapsed()) {
        // If selection is not collapsed, collapse it to the start
        const newSelectionState = selectionState.merge({
          anchorOffset: selectionState.getStartOffset(),
          focusOffset: selectionState.getStartOffset(),
        });
        this.onChange(
          EditorState.forceSelection(editorState, newSelectionState)
        );
      }

      const contentState = this.state.editorState.getCurrentContent();
      const blocks = contentState.getBlockMap();
      let pastedText = "";

      // Iterate over blocks to retrieve pasted text
      blocks.forEach((block) => {
        pastedText += block.getText() + "\n"; // Concatenate text from each block
      });

      // Process the pasted text as needed
      console.log("Pasted Text:", pastedText);

      // Now you can handle the pasted text as required
    }, 0);
  }
  render() {
    const { editorState } = this.state;

    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    // console.log(editorState, "state");

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            readOnly={this.props.disable}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Доп. информация"
            ref="editor"
            spellCheck={true}
            onPaste={this.onPaste}
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  // { label: 'H1', style: 'header-one' },
  // { label: 'H2', style: 'header-two' },
  // { label: 'H3', style: 'header-three' },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  // { label: 'Blockquote', style: 'blockquote' },
  // { label: 'UL', style: 'unordered-list-item' },
  // { label: 'OL', style: 'ordered-list-item' },
  // { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Жирный", style: "BOLD" },
  { label: "Курсив", style: "ITALIC" },
  { label: "Подчёркнутый", style: "UNDERLINE" },
  // { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichTextEditor;
