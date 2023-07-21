import wolframalpha

client = wolframalpha.Client('JGUTQ4-RG973Q6L5E')
wolfram_alpha_app_key = 'JGUTQ4-RG973Q6L5E '

while True :
    query = str(input('Query:  '))
    res = client.query(query)
    output = next(res.results).text
    print(output)