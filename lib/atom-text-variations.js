'use babel';

// import AtomTextVariationsView from './atom-text-variations-view';
import { CompositeDisposable } from 'atom';

export default {

  atomTextVariationsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // this.atomTextVariationsView = new AtomTextVariationsView(state.atomTextVariationsViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.atomTextVariationsView.getElement(),
    //   visible: false
    // });
    //
    // // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    //
    // // Register command that toggles this viewHello
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-text-variations:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomTextVariationsView.destroy();
  },

  serialize() {
    return {
      atomTextVariationsViewState: this.atomTextVariationsView.serialize()
    };
  },


  toggle() {
    console.log('AtomTextVariations was toggled!');
    editor = atom.workspace.getActiveTextEditor();
    selection = editor.getLastSelection().getText();
    prefix = '@include variables(( \n';
    suffix = ' ));';
    allItems = '';

    array = selection.split(';');
    array.forEach(function(item){
      if(item != '' && item != null){
      newItem = item
        .toString()
        .trim()
        .replace(':', ',');

        allItems += '(' + newItem + '), \n';
      }
    })
    // console.log(allItems)

    // for each (item in array){
    //   editor.insertText(item)
    // }

    editor.insertText(prefix + allItems + suffix)
  }

};
