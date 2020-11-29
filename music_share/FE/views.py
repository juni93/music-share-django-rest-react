from django.shortcuts import render

# Create your views here.
#render the view from django and let REACT handle all FE
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')