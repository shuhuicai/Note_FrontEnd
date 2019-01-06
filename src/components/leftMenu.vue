<template>
  <div class="leftMenu">
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          :data="folderData"
          node-key="id"
          draggable
          :expand-on-click-node="true">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
  let id = 1000;
  
  export default {
    data() {
      return {
        folderData: []
      }
    },
    
    created() {
      this.initFolder();
      setTimeout(() => {
        this.loading = false;
      }, 1500)
    },
    
    methods: {
      initFolder() {
        fetch(this.GLOBAL.serverURL + "/folder/initFolder", {
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
          headers: {
            Accept: "application/json"
          }
        }).then(response => {
            response.json().then((data) => {
              this.folderData = data;
            });
          },
          response => {
            console.log(response);
          })
      },
      
      append(data) {
        const newChild = {id: id++, label: 'test', children: []};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
    }
  };
</script>
<style lang="scss">
  .leftMenu {
    display: block;
    position: fixed;
    bottom: 0;
    top: 60px;
    width: 190px;
    left: 0;
    z-index: 999;
    ul {
      height: 100%;
      border-radius: 0;
    }
  }
  
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
