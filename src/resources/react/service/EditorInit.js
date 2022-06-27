function createInformationNotification() {
  tinymce.activeEditor.notificationManager.open({
    text: 'Загружаемое изображение не должно превышать 1МБ (1000КБ)',
    type: 'info'
  });
}

const editorInit = {
  language: 'ru',
  selector: 'textarea#full-featured-non-premium',
  plugins: 'print paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
  imagetools_cors_hosts: ['picsum.photos'],
  menubar: 'file edit view insert format tools table help',
  toolbar: 'undo redo | insertfile image link | bold italic underline forecolor emoticons | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | numlist bullist',
  toolbar_sticky: true,
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  image_advtab: true,
  importcss_append: true,
  image_title: true,
  automatic_uploads: true,
  images_upload_url: `ссылка находиться в details.jsx`,
  file_picker_types: 'image',
  file_picker_callback: function (cb, value, meta) {
  let input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = function () {
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      let id = 'blobid' + (new Date()).getTime();
      let blobCache =  tinymce.activeEditor.editorUpload.blobCache;
      let base64 = reader.result.split(',')[1];
      let blobInfo = blobCache.create(id, file, base64); 
      blobCache.add(blobInfo);
      cb(blobInfo.blobUri(), { title: file.name });
    };
    reader.readAsDataURL(file);
  }},
  height: 750,
  max_height: 10000,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image imagetools',
  content_style: 'body { font-family:Verdana,Arial,sans-serif; font-size:14px;}' + 'img {max-width: 100%} ' + 'img {height: auto}',
  setup: function(editor) {
    editor.on('skinLoaded', function(e) {
      createInformationNotification();
    });
  },
  }

  export default editorInit