import httpInstance from "@/utils/http";
import axios from "axios";
export function getCategoryAPI(){
    return httpInstance({
        url:'/home/category/head'
    }
    )
}