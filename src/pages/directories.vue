<template>
  <div>
    <div class="directories_top">
      <Title text="党员名录"></Title>
    </div>
    <div class="directories_content">
      <div class="item" v-for="(item,index) in List" :key="index">
        <PartyItem :item="item"></PartyItem>
      </div>
    </div>
    <div class="page_num">
      <Page
        @on-change="pageChange"
        :total="total"
        :current="PageIndex"
        show-elevator
        :page-size="PageSize"
        :show-total="true"
      />
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { GetPartyMemberList } from "../Api/Api.js";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import PartyItem from "@/components/PartyItem";
export default {
  components: {
    Title,
    Footer,
    PartyItem
  },
  data() {
    return {
      PageIndex: 1,
      total: 0,
      PageSize: 8,
      List:[]
    };
  },
  created() {
    this.PageIndex = this.$route.query.page
      ? Number(this.$route.query.page)
      : 1;
    this.PartyMemberList();
  },
  beforeRouteUpdate(to, from, next) {
    this.PageIndex = to.query.page;
    this.PartyMemberList();
    next();
  },
  methods: {
    pageChange(page) {
      this.$router.push({ name: "directories", query: { page: page } });
    },
    PartyMemberList() {
      GetPartyMemberList({
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      }).then(res => {
        if (res.data.LPartyMemberForWebList == null) {
            this.$router.push({ name: "directories" });
            this.$Message.warning("没有那么多数据");
          } else {
            this.total = res.data.RowCount;
            this.List = res.data.LPartyMemberForWebList;
          }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.DJ_width {
  width: 1100px;
  margin: 0 auto;
}
.shadow_box {
  width: inherit;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
}
.content_mtop {
  margin-top: 30px;
}
.directories_top {
  .DJ_width;
  .content_mtop;
}
.directories_content {
  .DJ_width;
  .content_mtop;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 25%;
    padding: 0 1%;
  }
}
.page_num {
  .DJ_width;
  height: 80px;
  display: flex;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
}
</style>
