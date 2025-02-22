// vite.config.mts
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///D:/Work/Synsh/syrcb-system-admin/node_modules/.pnpm/vite@5.4.9_@types+node@18.19.56_sass@1.79.5/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Work/Synsh/syrcb-system-admin/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vi_8802bf040507dd4c04c2e058a44d0211/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/Work/Synsh/syrcb-system-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1._64c3dc7e0df04507ee2a655cc617339c/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///D:/Work/Synsh/syrcb-system-admin/node_modules/.pnpm/vite-plugin-vue-devtools@7._6d99dad3bbfb0971870a3856e0868d81/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { createSvgIconsPlugin } from "file:///D:/Work/Synsh/syrcb-system-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_4c80484a2b7470c404c2469b86506cb5/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import viteCompression from "file:///D:/Work/Synsh/syrcb-system-admin/node_modules/.pnpm/vite-plugin-compression@0.5_4f94fca54c62072097d9de9e7e4530d3/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Work/Synsh/syrcb-system-admin/vite.config.mts";
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    base: env.VITE_PUBLIC_PATH,
    root,
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      // 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      // 配置 gzip 压缩插件
      viteCompression({
        algorithm: "gzip",
        // 使用 gzip 压缩
        ext: ".gz",
        // 压缩文件扩展名
        threshold: 10240,
        // 只有大于 10 KB 的文件才会被压缩
        deleteOriginFile: false
        // 不删除源文件
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
        "package.json": new URL("package.json", __vite_injected_original_import_meta_url).pathname
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          // https://github.com/sass/dart-sass/issues/2395#issuecomment-988870897
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_PORT),
      open: env.VITE_OPEN === "true",
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), ""),
          // https is require secure=false
          .../^https:\/\//.test(env.VITE_API_URL) ? { secure: false } : {}
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxTeW5zaFxcXFxzeXJjYi1zeXN0ZW0tYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcU3luc2hcXFxcc3lyY2Itc3lzdGVtLWFkbWluXFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9TeW5zaC9zeXJjYi1zeXN0ZW0tYWRtaW4vdml0ZS5jb25maWcubXRzXCI7Ly8gdml0ZS5jb25maWcubXRzXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIENvbmZpZ0VudiwgVXNlckNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XHJcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XHJcblxyXG4vLyBcdTc1MzFcdTRFOEVcdTYyMTFcdTRFRUNcdTRGN0ZcdTc1MjhcdTc2ODRcdTY2MkYgRVNNXHVGRjBDXHU0RTBEXHU1MThEXHU5NzAwXHU4OTgxIGNvbnN0IHBhdGggPSByZXF1aXJlKCdub2RlOnBhdGgnKTtcclxuLy8gXHU3NkY0XHU2M0E1XHU0RjdGXHU3NTI4IGltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJzsgXHU1MzczXHU1M0VGXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcclxuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogZW52LlZJVEVfUFVCTElDX1BBVEgsXHJcbiAgICByb290LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgdnVlSnN4KCksXHJcbiAgICAgIHZ1ZURldlRvb2xzKCksXHJcbiAgICAgIC8vIFx1NEY3Rlx1NzUyOCBzdmcgXHU1NkZFXHU2ODA3XHJcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBcdTkxNERcdTdGNkUgZ3ppcCBcdTUzOEJcdTdGMjlcdTYzRDJcdTRFRjZcclxuICAgICAgdml0ZUNvbXByZXNzaW9uKHtcclxuICAgICAgICBhbGdvcml0aG06ICdnemlwJywgLy8gXHU0RjdGXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHJcbiAgICAgICAgZXh0OiAnLmd6JywgLy8gXHU1MzhCXHU3RjI5XHU2NTg3XHU0RUY2XHU2MjY5XHU1QzU1XHU1NDBEXHJcbiAgICAgICAgdGhyZXNob2xkOiAxMDI0MCwgLy8gXHU1M0VBXHU2NzA5XHU1OTI3XHU0RThFIDEwIEtCIFx1NzY4NFx1NjU4N1x1NEVGNlx1NjI0RFx1NEYxQVx1ODhBQlx1NTM4Qlx1N0YyOVxyXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlLCAvLyBcdTRFMERcdTUyMjBcdTk2NjRcdTZFOTBcdTY1ODdcdTRFRjZcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICdwYWNrYWdlLmpzb24nOiBuZXcgVVJMKCdwYWNrYWdlLmpzb24nLCBpbXBvcnQubWV0YS51cmwpLnBhdGhuYW1lLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJywgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Nhc3MvZGFydC1zYXNzL2lzc3Vlcy8yMzk1I2lzc3VlY29tbWVudC05ODg4NzA4OTdcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIkAvc3R5bGVzL2VsZW1lbnQvaW5kZXguc2Nzc1wiIGFzICo7YCxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHBvcnQ6IE51bWJlcihlbnYuVklURV9QT1JUKSxcclxuICAgICAgb3BlbjogZW52LlZJVEVfT1BFTiA9PT0gJ3RydWUnLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUElfVVJMLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgd3M6IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vYXBpYCksICcnKSxcclxuICAgICAgICAgIC8vIGh0dHBzIGlzIHJlcXVpcmUgc2VjdXJlPWZhbHNlXHJcbiAgICAgICAgICAuLi4oL15odHRwczpcXC9cXC8vLnRlc3QoZW52LlZJVEVfQVBJX1VSTCkgPyB7IHNlY3VyZTogZmFsc2UgfSA6IHt9KSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsZUFBZTtBQUN4QixTQUFTLGVBQWUsV0FBVztBQUNuQyxTQUFTLGNBQXFDLGVBQWU7QUFDN0QsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLHFCQUFxQjtBQVJvSixJQUFNLDJDQUEyQztBQWFqTyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBNkI7QUFDL0QsUUFBTSxPQUFPLFFBQVEsSUFBSTtBQUN6QixRQUFNLE1BQU0sUUFBUSxNQUFNLElBQUk7QUFFOUIsU0FBTztBQUFBLElBQ0wsTUFBTSxJQUFJO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsWUFBWTtBQUFBO0FBQUEsTUFFWixxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLFFBQ3JELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsZ0JBQWdCO0FBQUEsUUFDZCxXQUFXO0FBQUE7QUFBQSxRQUNYLEtBQUs7QUFBQTtBQUFBLFFBQ0wsV0FBVztBQUFBO0FBQUEsUUFDWCxrQkFBa0I7QUFBQTtBQUFBLE1BQ3BCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLFFBQ3BELGdCQUFnQixJQUFJLElBQUksZ0JBQWdCLHdDQUFlLEVBQUU7QUFBQSxNQUMzRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLEtBQUs7QUFBQTtBQUFBLFVBQ0wsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTSxPQUFPLElBQUksU0FBUztBQUFBLE1BQzFCLE1BQU0sSUFBSSxjQUFjO0FBQUEsTUFDeEIsT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUSxJQUFJO0FBQUEsVUFDWixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sR0FBRyxFQUFFO0FBQUE7QUFBQSxVQUV2RCxHQUFJLGNBQWMsS0FBSyxJQUFJLFlBQVksSUFBSSxFQUFFLFFBQVEsTUFBTSxJQUFJLENBQUM7QUFBQSxRQUNsRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
