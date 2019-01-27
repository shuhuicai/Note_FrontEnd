<template>
  <quill-editor ref="myTextEditor"
                v-model="content"
                :config="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"></quill-editor>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  
  export default {
    name: "noteFile",
    data() {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {
          // something config
        }
      }
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorBlur() {
        console.log("onEditorBlur method");
      },
      onEditorFocus() {
        console.log("onEditorFocus method");
      },
      onEditorReady() {
        console.log("onEditorReady method");
      }
    },
  }
</script>

<style scoped>

</style>
