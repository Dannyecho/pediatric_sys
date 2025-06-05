import google.generativeai as genai
api_key = 'AIzaSyAbsY5Tj_x-RCa3oFRp6B78e8vM_sUyxPM'

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")
print("Welcome to GROUP 2 Pediatric Diagnostic system\nNOTE: to terminate the program, enter 'q'")
print("Kindly enter patient's symptoms\n")

while(True):
    symptoms = input( "Input symptoms: " )
    if( symptoms.lower() == 'q' ):
        print( "Program Terminated" )
        break

    response = model.generate_content(symptoms + "\n\n Please generate your response as a pediatric consultant. Thanks")
    print("\n\nResponse: "+ response.text)
    symptoms = input( "Do you want to continue? y/n: " )
    if(symptoms.lower() == 'n'):
        print( "Program Terminated" )
        break