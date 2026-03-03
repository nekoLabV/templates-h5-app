<script setup lang="ts">
import { onMounted } from 'vue'
import { getUserInfo } from '@/services'

onMounted(async () => {
  const res = await getUserInfo()
  console.log('getUserInfo', res)
})
</script>

<template>
  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ut distinctio error obcaecati quas, debitis rerum quis, nulla maiores quod voluptatibus magnam minus officiis ad porro, cum recusandae harum sunt?
  Temporibus aut reiciendis illum? Facere eaque, eveniet pariatur velit fuga expedita voluptates qui minus voluptatum accusantium recusandae tenetur ab tempore excepturi quaerat. Nesciunt nulla nobis quia provident voluptatibus minima consectetur.
  Debitis dignissimos, porro sint recusandae culpa blanditiis numquam maiores voluptas laborum voluptatum necessitatibus velit reiciendis suscipit! Doloremque deserunt earum numquam quisquam totam et maxime excepturi ad! Magnam non nihil et.
  Error quisquam assumenda rem ipsum architecto ea. Beatae iure doloribus, exercitationem, sunt, expedita asperiores commodi accusamus soluta quos et rerum! In dolores illo repudiandae rem quidem, accusamus rerum sunt quae.
  Deserunt excepturi quisquam, consectetur exercitationem et minima, consequuntur dolores nemo, repellendus qui pariatur aperiam tempora explicabo nulla illo delectus officia quis rerum possimus laudantium sit deleniti quia facere reiciendis! Dolorum!
  Deleniti dignissimos accusantium animi rerum incidunt obcaecati ullam, rem nemo vero. Blanditiis, tempora ipsa assumenda voluptates itaque earum a explicabo quas vitae quod! Nostrum quo omnis ad soluta accusamus est.
  Autem sapiente dolorum quas dolorem impedit praesentium nostrum voluptatem, nemo sed minima corporis possimus enim nobis est nam deleniti minus, nisi at. Saepe eum ab quidem aliquam officiis amet impedit?
  Porro perferendis voluptatum ipsam! Veniam omnis harum explicabo! Doloribus aliquid aperiam esse ratione quasi nesciunt ullam porro cumque. Possimus, minima assumenda. Sapiente, repudiandae eligendi! Debitis quibusdam porro minus ipsa optio!
  Minima, modi labore ducimus dicta aperiam sint sunt minus ipsam nesciunt odio distinctio molestiae aliquid magni! Porro, autem doloremque provident expedita dicta blanditiis possimus voluptate cupiditate necessitatibus odio nisi molestias.
  Recusandae molestiae dolores voluptatem voluptate consectetur deserunt fugiat ipsum ratione id quis, blanditiis dicta error iusto tempora beatae cum, corrupti incidunt quibusdam. Qui vero quae provident! Eligendi minus quod quos!</div>
</template>
