<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          ĐẬU ĐẬU - PHÚC LÂM
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row">
        <q-card
            class="bg-primary text-white  col-10 col-md-3 q-ma-lg q-pa-sm"
        >
          <q-card-section>
            <span class="text-orange text-h6">
              NHẬP THÔNG TIN
            </span>
          </q-card-section>
          <q-card-section>
            <q-input class="q-ma-sm"
                color="orange"
                label-color="orange"
                square
                size="lg"
                label="TÊN"
                outlined
                v-model="name"
                clearable
                @keyup.enter="addNameToList"
            >
              <template #after>
                <q-btn
                  color="primary"
                  icon="add"
                  glossy
                  round
                  push
                  @click="addNameToList"
                />
              </template>
            </q-input>
            <q-color class="q-ma-sm"
                v-model="color"
                default-view="palette"
                :palette="['#B26542']"
            />
            <el-table :data="names" class="q-ma-sm">
              <el-table-column prop="name" label="Tên" class="full-width">
                <template #default="props">
                  <span class="q-ma-sm">
                    {{props.row.name}}
                  </span>
                  <q-btn
                      push
                      glossy
                      round
                      color="red"
                      size="xs"
                      icon="delete"
                      class="float-right"
                      @click="removeNameFromList(props.$index)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <q-btn class="q-ma-sm"
              glossy
              color="green"
              label="Tạo thiệp"
              @click="createPicture"
              :disable="name.length <= 0"
            />
            <q-btn class="q-ma-sm"
               glossy
               color="green"
               label="Tạo thiệp hàng loạt"
               @click="DoCreatePictureList"
               :disable="names.length <= 0"
               :loading="creating"
            >
              <template #loading>
                <q-spinner-dots
                    color="primary"
                    size="2em"
                />
                <span class="text-orange q-ml-md">Đang tạo thiệp</span>
              </template>
            </q-btn>
            <q-btn class="q-ma-sm"
               glossy
               color="green"
               label="Tải thiệp"
               @click="Download"
            />
          </q-card-section>
        </q-card>
        <canvas class="col-auto q-ma-md" id='canvas' width="900" height="900" />
      </div>
    </q-page-container>
    <div id="multi_canvas" style="visibility: hidden; max-height: 1px; max-width: 1px" />
    <q-footer elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Tạo bởi Ba Bơ với tình yêu con vô bờ bến 🥰</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
<script>
String.prototype.toUpperLetter = function(){
  const arr = this.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }
  const str2 = arr.join(" ");
  return str2
}
import {fabric} from 'fabric'
import { LocalStorage } from 'quasar'
const $q = LocalStorage
export default {
  name: 'App',
  data(){
    return {
      name: '',
      color: '#B26542',
      names:[],
      creating: false,
    }
  },
  methods:{
    slug(title) {
      let slug = title.toLowerCase();
      slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
      slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
      slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
      slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
      slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
      slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
      slug = slug.replace(/đ/gi, 'd');
      slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
      slug = slug.replace(/ /gi, "-");
      slug = slug.replace(/\-\-\-\-\-/gi, '-');
      slug = slug.replace(/\-\-\-\-/gi, '-');
      slug = slug.replace(/\-\-\-/gi, '-');
      slug = slug.replace(/\-\-/gi, '-');
      slug = '@' + slug + '@';
      slug = slug.replace(/\@\-|\-\@|\@/gi, '');
      return slug;
    },
    createPicture(){
      const canvas = new fabric.Canvas('canvas');
      const app = this
      const printName = app.name.toUpperLetter()
      fabric.Image.fromURL('/daudau3.png', function(oImg) {
        oImg.scaleToWidth(900, true)
        oImg.scaleToHeight(900, true)
        const text = new fabric.Text(printName, {
          left: 368,
          top: 650,
          fontFamily: 'Quicksand',
          fontSize: 32.5,
          fontWeight: 'bold',
        })
        text.set({fill: app.color})
        const group = new fabric.Group([oImg, text])
        canvas.add(group).renderAll()
      })
    },
    addNameToList(){
      this.names.push({name: this.name.toUpperLetter()})
      this.name = ''
      $q.set('list_names',this.names)
    },
    removeNameFromList(index){
      this.names.splice(index,1)
      $q.set('list_names',this.names)
    },
    Download(){
      const link = document.createElement('a');
      link.download = `${this.slug(this.name)}.png`;
      link.href = document.getElementById('canvas').toDataURL()
      link.click();
    },
    DoCreatePictureList(){
      const app = this
      app.creating = true
      const myNode = document.getElementById("multi_canvas");
      myNode.innerHTML = ''; let completed = false;
      for(let i=0;i<app.names.length;i++){
          const name = app.names[i]
          const canvas_element = document.createElement('canvas');
          canvas_element.id = `canvas_${name.name}`;
          canvas_element.width = 900
          canvas_element.height = 900
          myNode.appendChild(canvas_element)
          const canvas = new fabric.Canvas(`canvas_${name.name}`);
          const printName = name.name
          fabric.Image.fromURL('/daudau3.png', function(oImg) {
            oImg.scaleToWidth(900, true)
            oImg.scaleToHeight(900, true)
            const text = new fabric.Text(printName, {
              left: 368,
              top: 650,
              fontFamily: 'Quicksand',
              fontSize: 32.5,
              fontWeight: 'bold',
            })
            text.set({fill: app.color})
            const group = new fabric.Group([oImg, text])
            canvas.add(group).renderAll()
            const link = document.createElement('a');
            link.download = `${app.slug(name.name)}.png`;
            link.href = document.getElementById(`canvas_${name.name}`).toDataURL()
            link.click();
            if(i === app.names.length-1){
              setTimeout(()=>{
                myNode.innerHTML = '';
                app.names = []
              },5000)
            }
          })
      }
      app.creating = false
    }
  },
  mounted() {
    const names = $q.getItem('list_names')
    if(Array.isArray(names) && names.length > 0){
      this.names = names
    }
  }
}
</script>
<style>
  canvas{border:1px solid #ccc}

</style>