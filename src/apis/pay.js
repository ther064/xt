import httpInstance from "@/utils/http"

export const createOrderAPI = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}
export const getOrderIdAPI=(id)=>{
  return httpInstance({
    url:`/member/order/${id}`
  })
}