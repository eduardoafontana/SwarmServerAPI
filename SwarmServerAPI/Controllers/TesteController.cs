using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.Models;

namespace SwarmServerAPI.Controllers
{
    public class TesteController : ApiController
    {
        //OBSERVAÇÃO: Por default, métodos declarados em um Controller como públicos e cujos nomes se iniciem por “Get”, “Post”, “Put” e “Delete” são mapeados automaticamente para o processamento das requisições HTTP correspondentes (GET, POST, PUT e DELETE, respectivamente).
        //https://www.devmedia.com.br/asp-net-web-api-implementando-servicos-restful/31024
        //http://www.ciceroednilson.com.br/criando-um-servico-restful-com-web-api-em-c/

        public IEnumerable<Teste> Get()
        {
            try
            {
                using (SwarmData context = new SwarmData())
                {
                    return context.Tables.Select(x => new Teste { Chave = x.Chave, Valor = x.Valor }).ToList();
                }
            }
            catch (Exception ex)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(ex.ToString()),
                    ReasonPhrase = "Erro on get data from database."
                };

                throw new HttpResponseException(resp);
            }
        }
    }
}
