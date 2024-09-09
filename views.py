from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
# Create your views here.

def index(request):
    return HttpResponse("Welcome to Dashboard API")

def candle(request):
    data = {
        "data": [
            {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
            
            {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40}
            ]
        }
    return JsonResponse(data)

def line(request):
    data = {
            "labels": ["Jan", "Feb", "Mar", "Apr"], 
            
            "data": [10, 20, 30, 40]
        }
    return JsonResponse(data)

def pie(request):
    data = {
            "labels": ["Red", "Blue", "Yellow"], 
            
            "data": [300, 50, 100]
        }
    return JsonResponse(data)

def bar(request):
    data = {
            "labels": ["Product A", "Product B", "Product C"], 
         
            "data": [100, 150, 200]
        }
    return JsonResponse(data)