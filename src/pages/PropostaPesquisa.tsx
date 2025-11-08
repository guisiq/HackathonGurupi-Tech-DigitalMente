import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { FlaskConical, Users, DollarSign, BookOpen } from "lucide-react";

const pesquisaSchema = z.object({
  titulo: z.string().min(5, "Título deve ter no mínimo 5 caracteres").max(200, "Título muito longo"),
  resumo: z.string().min(20, "Resumo deve ter no mínimo 20 caracteres").max(1000, "Resumo muito longo"),
  problemaRelacionado: z.string().optional(),
  areaConhecimento: z.string().min(1, "Selecione uma área"),
  objetivos: z.string().min(20, "Objetivos devem ter no mínimo 20 caracteres"),
  metodologia: z.string().min(20, "Metodologia deve ter no mínimo 20 caracteres"),
  resultadosEsperados: z.string().min(20, "Resultados esperados devem ter no mínimo 20 caracteres"),
  palavrasChave: z.string().min(3, "Adicione palavras-chave"),
  pesquisadorResponsavel: z.string().min(3, "Nome do pesquisador é obrigatório"),
  instituicao: z.string().min(3, "Instituição é obrigatória"),
  grupoPesquisa: z.string().optional(),
  equipe: z.string().optional(),
  fontesFinanciamento: z.string().min(1, "Selecione ao menos uma fonte"),
  orcamento: z.coerce.number().min(0, "Orçamento deve ser positivo").optional(),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataTermino: z.string().min(1, "Data de término é obrigatória"),
  statusProposta: z.string().min(1, "Selecione o status"),
});

type PesquisaForm = z.infer<typeof pesquisaSchema>;

const PropostaPesquisa = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PesquisaForm>({
    resolver: zodResolver(pesquisaSchema),
  });

  const onSubmit = (data: PesquisaForm) => {
    console.log("Proposta cadastrada:", data);
    toast.success("Proposta cadastrada com sucesso!", {
      description: "A proposta de pesquisa foi registrada no sistema.",
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3 mb-2">
              <FlaskConical className="h-8 w-8 text-secondary" />
              Proposta de Projeto de Pesquisa
            </h1>
            <p className="text-muted-foreground">
              Registre propostas de pesquisa voltadas à solução dos problemas públicos identificados.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Identificação do Projeto */}
            <Card className="p-6 shadow-[var(--shadow-medium)]">
              <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Identificação do Projeto
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="titulo">Título do Projeto *</Label>
                  <Input
                    id="titulo"
                    {...register("titulo")}
                    placeholder="Ex: Sistema de iluminação inteligente para bairros periféricos"
                    className="mt-1"
                  />
                  {errors.titulo && (
                    <p className="text-sm text-destructive mt-1">{errors.titulo.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="resumo">Resumo da Proposta *</Label>
                  <Textarea
                    id="resumo"
                    {...register("resumo")}
                    placeholder="Descrição geral do projeto e sua relevância..."
                    rows={4}
                    className="mt-1"
                  />
                  {errors.resumo && (
                    <p className="text-sm text-destructive mt-1">{errors.resumo.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="problemaRelacionado">Problema Público Relacionado (opcional)</Label>
                  <Input
                    id="problemaRelacionado"
                    {...register("problemaRelacionado")}
                    placeholder="ID ou título do problema público"
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Detalhamento Técnico */}
            <Card className="p-6 shadow-[var(--shadow-medium)]">
              <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                Detalhamento Técnico
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="areaConhecimento">Área do Conhecimento *</Label>
                    <Select {...register("areaConhecimento")}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engenharia-eletrica">Engenharia Elétrica</SelectItem>
                        <SelectItem value="computacao">Computação</SelectItem>
                        <SelectItem value="administracao-publica">Administração Pública</SelectItem>
                        <SelectItem value="engenharia-civil">Engenharia Civil</SelectItem>
                        <SelectItem value="ciencias-sociais">Ciências Sociais</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.areaConhecimento && (
                      <p className="text-sm text-destructive mt-1">{errors.areaConhecimento.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="palavrasChave">Palavras-Chave (Tags) *</Label>
                    <Input
                      id="palavrasChave"
                      {...register("palavrasChave")}
                      placeholder="IoT, sustentabilidade, smart city"
                      className="mt-1"
                    />
                    {errors.palavrasChave && (
                      <p className="text-sm text-destructive mt-1">{errors.palavrasChave.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="objetivos">Objetivos do Projeto *</Label>
                  <Textarea
                    id="objetivos"
                    {...register("objetivos")}
                    placeholder="O que se busca alcançar com este projeto..."
                    rows={4}
                    className="mt-1"
                  />
                  {errors.objetivos && (
                    <p className="text-sm text-destructive mt-1">{errors.objetivos.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="metodologia">Metodologia *</Label>
                  <Textarea
                    id="metodologia"
                    {...register("metodologia")}
                    placeholder="Abordagem técnica/científica a ser utilizada..."
                    rows={4}
                    className="mt-1"
                  />
                  {errors.metodologia && (
                    <p className="text-sm text-destructive mt-1">{errors.metodologia.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="resultadosEsperados">Resultados Esperados *</Label>
                  <Textarea
                    id="resultadosEsperados"
                    {...register("resultadosEsperados")}
                    placeholder="Impacto e métricas esperadas..."
                    rows={4}
                    className="mt-1"
                  />
                  {errors.resultadosEsperados && (
                    <p className="text-sm text-destructive mt-1">{errors.resultadosEsperados.message}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Equipe e Instituição */}
            <Card className="p-6 shadow-[var(--shadow-medium)]">
              <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Equipe e Instituição
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pesquisadorResponsavel">Pesquisador Responsável *</Label>
                    <Input
                      id="pesquisadorResponsavel"
                      {...register("pesquisadorResponsavel")}
                      placeholder="Nome completo"
                      className="mt-1"
                    />
                    {errors.pesquisadorResponsavel && (
                      <p className="text-sm text-destructive mt-1">{errors.pesquisadorResponsavel.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="instituicao">Instituição / Universidade *</Label>
                    <Input
                      id="instituicao"
                      {...register("instituicao")}
                      placeholder="Ex: UFT, IFTO, UNITINS"
                      className="mt-1"
                    />
                    {errors.instituicao && (
                      <p className="text-sm text-destructive mt-1">{errors.instituicao.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="grupoPesquisa">Grupo de Pesquisa / Laboratório (opcional)</Label>
                  <Input
                    id="grupoPesquisa"
                    {...register("grupoPesquisa")}
                    placeholder="Nome do grupo vinculado"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="equipe">Equipe Envolvida (opcional)</Label>
                  <Textarea
                    id="equipe"
                    {...register("equipe")}
                    placeholder="Pesquisadores e colaboradores (separados por vírgula)"
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Financiamento e Gestão */}
            <Card className="p-6 shadow-[var(--shadow-medium)]">
              <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financiamento e Gestão
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fontesFinanciamento">Fontes de Financiamento *</Label>
                    <Select {...register("fontesFinanciamento")}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cnpq">CNPq</SelectItem>
                        <SelectItem value="capes">CAPES</SelectItem>
                        <SelectItem value="finep">FINEP</SelectItem>
                        <SelectItem value="fapto">FAPTO</SelectItem>
                        <SelectItem value="recursos-proprios">Recursos Próprios</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.fontesFinanciamento && (
                      <p className="text-sm text-destructive mt-1">{errors.fontesFinanciamento.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="orcamento">Orçamento Estimado (R$) (opcional)</Label>
                    <Input
                      id="orcamento"
                      type="number"
                      {...register("orcamento")}
                      placeholder="Ex: 50000"
                      className="mt-1"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dataInicio">Data de Início *</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      {...register("dataInicio")}
                      className="mt-1"
                    />
                    {errors.dataInicio && (
                      <p className="text-sm text-destructive mt-1">{errors.dataInicio.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="dataTermino">Data de Término *</Label>
                    <Input
                      id="dataTermino"
                      type="date"
                      {...register("dataTermino")}
                      className="mt-1"
                    />
                    {errors.dataTermino && (
                      <p className="text-sm text-destructive mt-1">{errors.dataTermino.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="statusProposta">Status da Proposta *</Label>
                    <Select {...register("statusProposta")}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rascunho">Rascunho</SelectItem>
                        <SelectItem value="submetido">Submetido</SelectItem>
                        <SelectItem value="aprovado">Aprovado</SelectItem>
                        <SelectItem value="em-andamento">Em andamento</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.statusProposta && (
                      <p className="text-sm text-destructive mt-1">{errors.statusProposta.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Limpar Formulário
              </Button>
              <Button type="submit" className="bg-secondary hover:opacity-90">
                Cadastrar Proposta
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PropostaPesquisa;
