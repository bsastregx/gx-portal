import requests

url = 'https://example.com/files/example_file.pdf'

response = requests.get(url)

if response.status_code == 200:
    with open('example_file.pdf', 'wb') as f:
        f.write(response.content)
        print('File downloaded successfully!')
else:
    print('File download failed.')