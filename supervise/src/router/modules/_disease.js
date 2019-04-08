/**
 * disease router
 */
export default [
  {
    path: "disease",
    name: "疾病",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/modules/disease")
  }
];
