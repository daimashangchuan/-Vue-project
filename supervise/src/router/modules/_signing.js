/**
 * signing router
 */
export default [
  {
    path: "signing",
    name: "签约",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/modules/signing")
  }
];
