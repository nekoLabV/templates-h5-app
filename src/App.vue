<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserInfo } from '@/services'

const isLoading = ref(false)
const input = ref()

onMounted(async () => {
  await getUserInfo()
})

const handleCopy = (text: string) => {
  console.log('复制了:', text)
}

const clickBtn = async () => {
  isLoading.value = true
  console.log('点击按钮')
  try {
    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('请求完成')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <p>
    <!-- 基础用法 -->
    <Text>普通文本</Text>
    <Text variant="primary">主要文本</Text>
    <Text variant="success">成功文本</Text>
    <Text variant="warning">警告文本</Text>
    <Text variant="danger">危险文本</Text>
    <Text variant="muted">弱化文本</Text>
    <br />

    <!-- 不同字号 -->
    <Text size="xs">极小文本</Text>
    <Text size="sm">小号文本</Text>
    <Text size="md">中号文本</Text>
    <Text size="lg">大号文本</Text>
    <Text size="xl">更大文本</Text>
    <Text size="2xl">超大文本</Text>
    <br />

    <!-- 字重 -->
    <Text weight="light">细体文本</Text>
    <Text weight="normal">正常文本</Text>
    <Text weight="medium">中等文本</Text>
    <Text weight="bold">粗体文本</Text>
    <br />

    <!-- 对齐方式 -->
    <Text align="left">左对齐</Text>
    <Text align="center">居中对齐</Text>
    <Text align="right">右对齐</Text>
    <br />

    <!-- 样式修饰 -->
    <Text italic>斜体文本</Text>
    <Text underline>下划线文本</Text>
    <Text delete>删除线文本</Text>
    <Text :truncate="true" style="width: 200px;">
      这是一段很长的文本，当超出宽度时会显示省略号
    </Text>
    <Text :lines="2" style="width: 300px;">
      这是一段多行文本，最多显示两行，超出部分会显示省略号。这是一段多行文本，最多显示两行，超出部分会显示省略号。
    </Text>
    <br />

    <!-- HTML 标签 -->
    <Text tag="h1">作为 H1 标题</Text>
    <Text tag="h2">作为 H2 标题</Text>
    <Text tag="h3">作为 H3 标题</Text>
    <Text tag="strong">强调文本</Text>
    <Text tag="small">小号文本标签</Text>
    <Text tag="blockquote">引用文本</Text>
    <br />

    <!-- 特殊类型 -->
    <Text code>const name = 'text';</Text>
    <Text mark>高亮文本</Text>
    <Text kbd>Ctrl + C</Text>
    <br />

    <!-- 上下标 -->
    <Text>
      正常文本
      <template #sup>上标</template>
      中间
      <template #sub>下标</template>
    </Text>
    <br />

    <!-- 可复制文本 -->
    <Text copyable @copy="handleCopy">
      点击右侧按钮复制这段文本
    </Text>
    <br />

    <!-- 自定义颜色和大小 -->
    <Text :color="'#ff6b6b'" :font-size="24" :weight="600" :letter-spacing="2">
      自定义样式文本
    </Text>
    <br />

    <!-- 禁用状态 -->
    <Text disabled>禁用文本</Text>
    <br />

    <!-- 组合使用 -->
    <Text variant="primary" size="xl" weight="bold" align="center" :underline="true">
      组合样式文本
    </Text>
  </p>
  <p>
    <Button :loading="isLoading" @click="clickBtn">查看更多</Button>
  </p>
  <p style="width: 300px;">
    <Input v-model="input" placeholder="请输入文本......" clearable></Input>
  </p>
  <Grid :cols="{
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6
  }" :gap="20">
    <GridItem v-for="n in 12" :key="n">
      Item {{ n }}
    </GridItem>
  </Grid>
  <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ut distinctio error obcaecati quas, debitis rerum
    quis, nulla maiores quod voluptatibus magnam minus officiis ad porro, cum recusandae harum sunt?
    Temporibus aut reiciendis illum? Facere eaque, eveniet pariatur velit fuga expedita voluptates qui minus voluptatum
    accusantium recusandae tenetur ab tempore excepturi quaerat. Nesciunt nulla nobis quia provident voluptatibus minima
    consectetur.
    Debitis dignissimos, porro sint recusandae culpa blanditiis numquam maiores voluptas laborum voluptatum
    necessitatibus
    velit reiciendis suscipit! Doloremque deserunt earum numquam quisquam totam et maxime excepturi ad! Magnam non nihil
    et.
    Error quisquam assumenda rem ipsum architecto ea. Beatae iure doloribus, exercitationem, sunt, expedita asperiores
    commodi accusamus soluta quos et rerum! In dolores illo repudiandae rem quidem, accusamus rerum sunt quae.
    Deserunt excepturi quisquam, consectetur exercitationem et minima, consequuntur dolores nemo, repellendus qui
    pariatur
    aperiam tempora explicabo nulla illo delectus officia quis rerum possimus laudantium sit deleniti quia facere
    reiciendis! Dolorum!
    Deleniti dignissimos accusantium animi rerum incidunt obcaecati ullam, rem nemo vero. Blanditiis, tempora ipsa
    assumenda voluptates itaque earum a explicabo quas vitae quod! Nostrum quo omnis ad soluta accusamus est.
    Autem sapiente dolorum quas dolorem impedit praesentium nostrum voluptatem, nemo sed minima corporis possimus enim
    nobis est nam deleniti minus, nisi at. Saepe eum ab quidem aliquam officiis amet impedit?
    Porro perferendis voluptatum ipsam! Veniam omnis harum explicabo! Doloribus aliquid aperiam esse ratione quasi
    nesciunt ullam porro cumque. Possimus, minima assumenda. Sapiente, repudiandae eligendi! Debitis quibusdam porro
    minus
    ipsa optio!
    Minima, modi labore ducimus dicta aperiam sint sunt minus ipsam nesciunt odio distinctio molestiae aliquid magni!
    Porro, autem doloremque provident expedita dicta blanditiis possimus voluptate cupiditate necessitatibus odio nisi
    molestias.
    Recusandae molestiae dolores voluptatem voluptate consectetur deserunt fugiat ipsum ratione id quis, blanditiis
    dicta
    error iusto tempora beatae cum, corrupti incidunt quibusdam. Qui vero quae provident! Eligendi minus quod quos!
  </Text>
</template>
