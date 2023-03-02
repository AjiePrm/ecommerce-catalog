import { ref, toRefs, reactive } from "vue";
import useFetch from "./use-fetch";
export default function () {
  let product = reactive({ list: [], error: null, fetching: false });
  const val = ref("");
  // let errors = reactive({error: null});
  const submitted = async () => {
    const { response, error, fetchData, fetching } = useFetch(
      `https://fakestoreapi.com/products/${val.value}`,
      {}
    );
    fetchData();
    product.list = response;
    product.error = error;
    product.fetching = fetching;
  };
  return { submitted, ...toRefs(product), val };
}
