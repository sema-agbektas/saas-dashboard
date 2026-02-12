from fastapi import FastAPI
app=FastAPI()
@app.get("/")
def home():
    return {"message":"Hello World"}
@app.get("/test")
def test():
    return{"status":"ok"}