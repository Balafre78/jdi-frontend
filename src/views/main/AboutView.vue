<template>
  <div class="text-white py-16 px-8 max-w-6xl mx-auto space-y-16">

    <section class="backdrop-blur-md border border-white/50 bg-white/5 rounded-xl shadow-lg p-8">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl opacity-40"></div>
      <div class="relative z-10 space-y-4 text-center">
        <h1 class="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          About <span class="text-indigo-400">JustDoIt</span>
        </h1>
        <p class="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          JustDoIt is a secure/user-friendly to-do list application that
          allows each user to create and manage multiple personal task lists. Every list can
          contain tasks categorized by three statuses (To Do, Doing, Done), making it easier
          to visualize progress and prioritize work. The application ensures secure access
          through authentication with JWT-based sessions, protecting user data and preventing
          unauthorized access. A clear and responsive interface will provide users with intuitive
          controls to add, edit, search and organize tasks efficiently, while the back end ensures
          reliable data storage and retrieval through a relational database.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>
