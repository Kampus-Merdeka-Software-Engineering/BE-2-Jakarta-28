import News from "../models/NewsModel.js";
import path from "path";
import fs from "fs";

export const getNews = async (req,res) => {
    try {
        const response = await News.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }

}

export const getNewsBySlug = async(req,res) => {

}

export const createNews = async(req,res) => {

}

export const updateNews = async(req,res) => {

}

export const deleteNews = async(req, res) => {
    
}