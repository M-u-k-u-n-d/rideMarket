export default defineNuxtRouteMiddleware((to, from) => {
      console.log("this is auth.js => ", to.path);
      
if (to.path.includes("profile")){
const user = useSupabaseUser();
  console.log("this is auth.js => ", user.value);

  if (!user.value) return navigateTo("/login");
} 
  
});
