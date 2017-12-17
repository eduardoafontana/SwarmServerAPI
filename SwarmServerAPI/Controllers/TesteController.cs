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
        //Best practices
        //https://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/

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
                throw ThrowError(ex);
            }
        }

        public string Post(SessionModel session)
        {
            try
            {
                using (SwarmData context = new SwarmData())
                {
                    context.Tables.Add(new Table {  });

                    context.SaveChanges();

                    return "Object created!";
                }
            }
            catch (Exception ex)
            {
                throw ThrowError(ex);
            }
        }

        private HttpResponseException ThrowError(Exception ex)
        {
            //TODO: bad smell return internal error. Review later.
            var resp = new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent(ex.ToString()),
                ReasonPhrase = "Error!"
            };

            return new HttpResponseException(resp);
        }
    }
}
