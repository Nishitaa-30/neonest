"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import { BookOpen, ExternalLink, Search, Filter, Clock } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { resources as articles } from "utils /resources.js";




const categories = [
  { id: "all", name: "All Resources" },
  { id: "feeding", name: "Feeding & Nutrition" },
  { id: "sleep", name: "Sleep & Rest" },
  { id: "development", name: "Development" },
  { id: "health", name: "Health & Safety" },
];

const formatCategories = [
  { id: "all", name: "All Formats" },
  { id: "article", name: "Article" },
  { id: "video", name: "Video" },
  { id: "audio", name: "Audio" },
  { id: "podcast", name: "Podcast" },
  { id: "journal", name: "Journals" },
];

//auto-cyclic colors for the tags in the article
const colorClasses = [
  "bg-orange-100 text-orange-600 hover:bg-orange-200",
  "bg-purple-100 text-purple-600 hover:bg-purple-200",
  "bg-teal-100 text-teal-600 hover:bg-teal-200",
  "bg-green-100 text-green-600 hover:bg-green-200",
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    document.title = "Resources | NeoNest";
  }, []);

  const filtersApplied = selectedCategory !== "all" || selectedType !== "all";

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !searchTerm ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;

    const matchesType = selectedType === "all" || article.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Parenting Resources</h2>
        <p className="text-lg text-gray-600 dark:text-gray-200">Curated articles to support your parenting journey</p>
      </div>

      {/* Search + Filters Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg w-full">
          <Search className="absolute left-3 inset-y-0 flex items-center h-full text-gray-400 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl dark:bg-gray-700 border border-gray-200 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 w-full h-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
          <div className="flex flex-row md:flex-row gap-2 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Category:</span>
              </div>
              <Select.Root value={selectedCategory} onValueChange={setSelectedCategory}>
                <Select.Trigger
                  className="flex justify-between items-center rounded-xl  dark:bg-gray-700 border border-gray-300 px-3 py-2 text-sm w-full sm:w-auto
            focus:ring-2 focus:ring-pink-500 focus:border-pink-500
            hover:border-pink-400 hover:shadow-md transition duration-150 ease-in-out">
                  <Select.Value placeholder="Select category" />
                  <Select.Icon>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Content className="bg-white  dark:bg-gray-700 border z-50 border-gray-200 rounded-lg shadow-lg overflow-hidden w-full sm:w-auto" position="popper">
                  <Select.Viewport className="p-1">
                    {categories.map((cat) => (
                      <Select.Item key={cat.id} value={cat.id} className="px-3 py-2 text-sm rounded-md hover:bg-pink-100  dark:hover:bg-gray-600 cursor-pointer focus:outline-none">
                        <Select.ItemText>{cat.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
            </div>

            {/* Format Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Format:</span>
              </div>
              <Select.Root value={selectedType} onValueChange={setSelectedType}>
                <Select.Trigger
                  className="flex justify-between items-center rounded-xl dark:bg-gray-700 border border-gray-300 px-3 py-2 text-sm w-full sm:w-auto
            focus:ring-2 focus:ring-pink-500 focus:border-pink-500
            hover:border-pink-400 hover:shadow-md transition duration-150 ease-in-out">
                  <Select.Value placeholder="Select format" />
                  <Select.Icon>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Content className="bg-white dark:bg-gray-700 z-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden w-full sm:w-auto" position="popper">
                  <Select.Viewport className="p-1">
                    {formatCategories.map((format) => (
                      <Select.Item key={format.id} value={format.id} className="px-3 py-2 text-sm rounded-md hover:bg-pink-100 dark:hover:bg-gray-600 cursor-pointer focus:outline-none">
                        <Select.ItemText>{format.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </div>

        {/* Clear All button */}
        <div className="w-full md:w-auto">
          <Button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedType("all");
            }}
            disabled={!filtersApplied}
            variant="outline"
            className={`rounded-xl text-sm font-medium px-4 h-10 w-full md:w-auto transition-colors
        ${filtersApplied ? "border-pink-300 text-pink-700 bg-pink-50 hover:bg-pink-600 hover:text-white" : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"}`}>
            Clear all
          </Button>
        </div>
      </div>

      {/* Horizontal dividing line */}
      <div className="w-full h-px bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 animate-pulse mt-1"></div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredArticles.map((article) => (
          <Card
            key={article.id}
            className="group bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between cursor-default overflow-hidden h-full">
            {/* Thumbnail */}
            {article.thumbnail && (
              <div className="overflow-hidden rounded-t-xl border-b  border-gray-200">
                <img src={article.thumbnail} alt={article.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
            )}

            <CardHeader className="p-4 !pb-2">
              <CardTitle className="text-lg mt-2 text-gray-800 dark:text-gray-200 transition-colors duration-200 group-hover:text-pink-600">{article.title}</CardTitle>
            </CardHeader>

            <div className="px-4 pb-2">
              <span
                className={`
                  inline-block text-xs font-semibold px-3 py-1 rounded-tl-md rounded-bl-md rounded-tr-sm rounded-br-sm uppercase tracking-wide
        ${
          article.type === "article"
            ? "bg-blue-100 text-blue-600"
            : article.type === "video"
              ? "bg-red-100 text-red-600"
              : article.type === "audio"
                ? "bg-green-100 text-green-600"
                : article.type === "podcast"
                  ? "bg-purple-100 text-purple-600"
                  : article.type === "journal"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-600"
        }
      `}>
                {article.type}
              </span>
            </div>

            <CardContent className="px-4 pb-6 !pt-2 flex flex-col flex-grow justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-4 dark:text-gray-200">{article.description}</p>
                <div className="space-y-1 mb-4 text-sm text-gray-500 dark:text-gray-200">
                  <div className="text-black dark:text-gray-200">By {article.author}</div>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-200">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                    <div>{new Date(article.publishDate).toLocaleDateString("en-GB")}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className={`text-xs px-2 py-1 rounded-full transition-colors duration-200 ${colorClasses[index % colorClasses.length]}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="w-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white font-medium rounded-xl transition-all duration-200"
                variant="ghost"
                onClick={() => window.open(article.url, "_blank")}>
                <ExternalLink className="w-4 h-4 mr-2" />
                {article.type === "video" ? "Watch Video" : article.type === "audio" ? "Listen Audio" : "Read More"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedType("all");
            }}
            className="rounded-xl text-pink-600 border-pink-300 hover:bg-pink-50 hover:text-pink-700">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
