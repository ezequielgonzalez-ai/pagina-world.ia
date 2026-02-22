from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.lib.units import inch, cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# Register fonts
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
registerFontFamily('SimHei', normal='SimHei', bold='SimHei')
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')

# Create document
doc = SimpleDocTemplate(
    "/home/z/my-project/download/GUIA_MONETIZACION_MEGIA.pdf",
    pagesize=A4,
    title="Guia de Monetizacion MEG.IA",
    author='Z.ai',
    creator='Z.ai',
    subject='Guia completa para monetizar tu web de links'
)

# Styles
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    name='TitleStyle',
    fontName='SimHei',
    fontSize=28,
    leading=36,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#6366f1'),
    spaceAfter=20
)

heading1_style = ParagraphStyle(
    name='Heading1Style',
    fontName='SimHei',
    fontSize=18,
    leading=24,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#6366f1'),
    spaceBefore=20,
    spaceAfter=12,
    leftIndent=0
)

heading2_style = ParagraphStyle(
    name='Heading2Style',
    fontName='SimHei',
    fontSize=14,
    leading=20,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#8b5cf6'),
    spaceBefore=15,
    spaceAfter=8
)

body_style = ParagraphStyle(
    name='BodyStyle',
    fontName='SimHei',
    fontSize=11,
    leading=18,
    alignment=TA_LEFT,
    spaceBefore=6,
    spaceAfter=6,
    wordWrap='CJK'
)

list_style = ParagraphStyle(
    name='ListStyle',
    fontName='SimHei',
    fontSize=11,
    leading=18,
    alignment=TA_LEFT,
    leftIndent=20,
    spaceBefore=4,
    spaceAfter=4,
    wordWrap='CJK'
)

highlight_style = ParagraphStyle(
    name='HighlightStyle',
    fontName='SimHei',
    fontSize=11,
    leading=18,
    alignment=TA_LEFT,
    backColor=colors.HexColor('#f0f9ff'),
    leftIndent=10,
    rightIndent=10,
    spaceBefore=8,
    spaceAfter=8,
    wordWrap='CJK'
)

# Content
story = []

# Cover
story.append(Spacer(1, 100))
story.append(Paragraph("GUIA COMPLETA DE MONETIZACION", title_style))
story.append(Spacer(1, 20))
story.append(Paragraph("MEG.IA", ParagraphStyle(
    name='BrandName',
    fontName='SimHei',
    fontSize=36,
    leading=44,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#8b5cf6')
)))
story.append(Spacer(1, 30))
story.append(Paragraph("Como ganar dinero con tu Link Hub", ParagraphStyle(
    name='Subtitle',
    fontName='SimHei',
    fontSize=16,
    leading=22,
    alignment=TA_CENTER,
    textColor=colors.gray
)))
story.append(Spacer(1, 50))
story.append(Paragraph("2025", ParagraphStyle(
    name='Year',
    fontName='Times New Roman',
    fontSize=14,
    alignment=TA_CENTER,
    textColor=colors.gray
)))
story.append(PageBreak())

# Table of Contents
story.append(Paragraph("CONTENIDO", heading1_style))
story.append(Spacer(1, 20))
toc_items = [
    "1. Google AdSense - Publicidad en tu Web",
    "2. Links de Afiliados - Comisiones por Recomendaciones",
    "3. Donaciones - Apoyo Directo de Seguidores",
    "4. Contenido Premium - Ingresos Recurrentes",
    "5. Patrocinios - Colaboraciones con Marcas",
    "6. Resumen y Plan de Accion"
]
for item in toc_items:
    story.append(Paragraph(item, body_style))
    story.append(Spacer(1, 8))
story.append(PageBreak())

# Section 1: Google AdSense
story.append(Paragraph("1. Google AdSense - Publicidad en tu Web", heading1_style))
story.append(Spacer(1, 15))

story.append(Paragraph("<b>Que es Google AdSense?</b>", heading2_style))
story.append(Paragraph(
    "Google AdSense es la plataforma de publicidad mas popular del mundo que te permite ganar dinero mostrando anuncios relevantes en tu sitio web. Funciona de manera automatica: Google coloca anuncios que coinciden con el contenido de tu pagina y tus visitantes, y tu ganas dinero cada vez que alguien ve o hace clic en esos anuncios. Es completamente gratuito y se integra facilmente con cualquier sitio web, incluido tu Link Hub de MEG.IA.",
    body_style
))

story.append(Spacer(1, 15))
story.append(Paragraph("<b>Como crear una cuenta de Google AdSense:</b>", heading2_style))

steps_adsense = [
    ("Paso 1", "Ve a www.google.com/adsense y haz clic en 'Comenzar'. Necesitaras una cuenta de Google (Gmail) para continuar con el proceso de registro."),
    ("Paso 2", "Ingresa la URL de tu sitio web (tu Link Hub) y selecciona el idioma principal de tu contenido. Asegurate de que tu URL sea correcta."),
    ("Paso 3", "Completa tu informacion personal incluyendo nombre, direccion y datos fiscales. Esto es necesario para recibir los pagos."),
    ("Paso 4", "Conecta tu sitio a AdSense. Google te dara un codigo HTML que debes agregar a tu web. En tu caso, esto ya esta preparado en los espacios designados."),
    ("Paso 5", "Espera la aprobacion. Google revisara tu sitio para asegurar que cumple con sus politicas. Este proceso puede tardar de 1 a 2 semanas."),
    ("Paso 6", "Una vez aprobado, los anuncios comenzaran a mostrarse automaticamente y empezaras a generar ingresos.")
]

for step, desc in steps_adsense:
    story.append(Paragraph(f"<b>{step}:</b> {desc}", list_style))
    story.append(Spacer(1, 6))

story.append(Spacer(1, 15))
story.append(Paragraph("<b>Consejos para maximizar ingresos con AdSense:</b>", heading2_style))

tips_adsense = [
    "Coloca anuncios en posiciones visibles pero no intrusivas - los espacios ya preparados en tu web estan optimizados para esto.",
    "Genera trafico de calidad - mientras mas visitas reales tengas, mas ganaras. Comparte tu link en todas tus redes sociales.",
    "Crea contenido valioso - los anuncios mejor pagados aparecen en sitios con contenido relevante y de calidad.",
    "Elige formatos de anuncios responsive - se adaptan automaticamente al tamano de pantalla del usuario.",
    "No hagas clic en tus propios anuncios - Google detecta esto y puede suspender tu cuenta permanentemente."
]

for tip in tips_adsense:
    story.append(Paragraph(f"- {tip}", list_style))
    story.append(Spacer(1, 4))

story.append(PageBreak())

# Section 2: Affiliate Links
story.append(Paragraph("2. Links de Afiliados - Comisiones por Recomendaciones", heading1_style))
story.append(Spacer(1, 15))

story.append(Paragraph("<b>Que son los programas de afiliados?</b>", heading2_style))
story.append(Paragraph(
    "Los programas de afiliados son acuerdos comerciales donde una empresa te paga una comision por cada venta o accion que se genere a traves de tu enlace unico. Es una de las formas mas rentables de monetizar contenido de tecnologia e IA, ya que muchas herramientas y cursos ofrecen comisiones generosas. Como creador de contenido sobre IA, tienes la ventaja de recomendar productos que tu audiencia realmente necesita.",
    body_style
))

story.append(Spacer(1, 15))
story.append(Paragraph("<b>Mejores programas de afiliados para creadores de IA:</b>", heading2_style))

# Table for affiliate programs
header_style_tbl = ParagraphStyle(
    name='TableHeader',
    fontName='SimHei',
    fontSize=10,
    textColor=colors.white,
    alignment=TA_CENTER
)
cell_style_tbl = ParagraphStyle(
    name='TableCell',
    fontName='SimHei',
    fontSize=9,
    alignment=TA_CENTER,
    wordWrap='CJK'
)

affiliate_data = [
    [Paragraph('<b>Programa</b>', header_style_tbl), Paragraph('<b>Comision</b>', header_style_tbl), Paragraph('<b>Categoria</b>', header_style_tbl)],
    [Paragraph('Amazon Associates', cell_style_tbl), Paragraph('1-10%', cell_style_tbl), Paragraph('Libros, gadgets, tech', cell_style_tbl)],
    [Paragraph('Coursera', cell_style_tbl), Paragraph('Hasta 45%', cell_style_tbl), Paragraph('Cursos de IA/ML', cell_style_tbl)],
    [Paragraph('Udemy', cell_style_tbl), Paragraph('15-50%', cell_style_tbl), Paragraph('Cursos varios', cell_style_tbl)],
    [Paragraph('Notion', cell_style_tbl), Paragraph('50%', cell_style_tbl), Paragraph('Productividad', cell_style_tbl)],
    [Paragraph('Jasper AI', cell_style_tbl), Paragraph('30% recurrente', cell_style_tbl), Paragraph('Herramienta de IA', cell_style_tbl)],
    [Paragraph('Copy.ai', cell_style_tbl), Paragraph('45%', cell_style_tbl), Paragraph('Generacion de texto', cell_style_tbl)],
    [Paragraph('Canva', cell_style_tbl), Paragraph('36$', cell_style_tbl), Paragraph('Diseno grafico', cell_style_tbl)],
    [Paragraph('Hostinger', cell_style_tbl), Paragraph('Hasta 60%', cell_style_tbl), Paragraph('Hosting web', cell_style_tbl)],
]

table = Table(affiliate_data, colWidths=[4*cm, 3*cm, 4*cm])
table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#6366f1')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('FONTNAME', (0, 0), (-1, -1), 'SimHei'),
    ('FONTSIZE', (0, 0), (-1, 0), 10),
    ('FONTSIZE', (0, 1), (-1, -1), 9),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('BACKGROUND', (0, 1), (-1, -1), colors.white),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f5f5f5')]),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
]))
story.append(table)
story.append(Spacer(1, 15))

story.append(Paragraph("<b>Como registrarse en Amazon Associates (el mas facil):</b>", heading2_style))

steps_amazon = [
    ("Paso 1", "Ve a affiliate-program.amazon.com y haz clic en 'Unirse ahora gratis'. Necesitaras una cuenta de Amazon existente."),
    ("Paso 2", "Ingresa la informacion de tu cuenta, incluyendo la direccion de pago donde recibiras las comisiones."),
    ("Paso 3", "Describe tu sitio web y como planeas promocionar productos de Amazon. Se honesto sobre tu contenido."),
    ("Paso 4", "Genera tus primeros enlaces de afiliado usando la herramienta SiteStripe de Amazon para cualquier producto."),
    ("Paso 5", "Coloca estos enlaces en tu Link Hub en las secciones de 'Herramientas' o 'Tienda'.")
]

for step, desc in steps_amazon:
    story.append(Paragraph(f"<b>{step}:</b> {desc}", list_style))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# Section 3: Donations
story.append(Paragraph("3. Donaciones - Apoyo Directo de Seguidores", heading1_style))
story.append(Spacer(1, 15))

story.append(Paragraph("<b>Plataformas de donaciones populares:</b>", heading2_style))
story.append(Paragraph(
    "Las donaciones son una forma directa y honesta de monetizar tu contenido. Tus seguidores mas fieles pueden apoyarte voluntariamente a cambio del valor que les proporcionas. Existen varias plataformas disenadas especificamente para creadores de contenido, cada una con sus propias ventajas y caracteristicas unicas.",
    body_style
))

donation_platforms = [
    ("Ko-fi", "ko-fi.com", "Sin comisiones, ideal para 'invitar un cafe'. Permite metas de financiamiento y tienda de productos digitales. Perfecto para empezar."),
    ("Buy Me a Coffee", "buymeacoffee.com", "Plataforma muy popular, facil de usar. Cobra 5% de comision en el plan gratuito. Muy intuitiva para los seguidores."),
    ("PayPal.me", "paypal.me", "El mas sencillo - solo necesitas una cuenta de PayPal. Sin comisiones para el creador, pero menos funciones."),
    ("Patreon", "patreon.com", "Ideal para contenido exclusivo recurrente. Permite crear niveles de membresia con beneficios diferentes. Mejor para audiencias establecidas."),
    ("GitHub Sponsors", "github.com/sponsors", "Perfecto si tu audiencia es tecnica. Sin comisiones de procesamiento. Ideal para proyectos open source.")
]

for name, url, desc in donation_platforms:
    story.append(Paragraph(f"<b>{name}</b> ({url})", list_style))
    story.append(Paragraph(desc, list_style))
    story.append(Spacer(1, 8))

story.append(Spacer(1, 15))
story.append(Paragraph("<b>Como configurar Ko-fi (recomendado para empezar):</b>", heading2_style))

steps_kofi = [
    ("Paso 1", "Ve a ko-fi.com y crea una cuenta gratuita usando tu email o cuenta de redes sociales."),
    ("Paso 2", "Personaliza tu pagina con tu foto de perfil, banner y una descripcion clara de lo que haces."),
    ("Paso 3", "Conecta tu cuenta de PayPal o Stripe para recibir los pagos directamente."),
    ("Paso 4", "Crea tu link unico (ejemplo: ko-fi.com/megia) y agregalo a tu Link Hub."),
    ("Paso 5", "Configura metas de financiamiento para motivar a tus seguidores a apoyarte.")
]

for step, desc in steps_kofi:
    story.append(Paragraph(f"<b>{step}:</b> {desc}", list_style))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# Section 4: Premium Content
story.append(Paragraph("4. Contenido Premium - Ingresos Recurrentes", heading1_style))
story.append(Spacer(1, 15))

story.append(Paragraph("<b>Que contenido premium puedes ofrecer?</b>", heading2_style))
story.append(Paragraph(
    "El contenido premium es informacion o recursos exclusivos que tus seguidores mas comprometidos estan dispuestos a pagar. Como creador de contenido sobre IA, tienes muchas opciones valiosas que puedes monetizar. La clave es ofrecer algo que no este disponible gratuitamente en otro lugar y que proporcione un valor real y tangible a tu audiencia.",
    body_style
))

premium_ideas = [
    "Plantillas de prompts probados y optimizados para diferentes herramientas de IA como ChatGPT, Claude, Midjourney",
    "Acceso anticipado a tus videos y contenido antes de que se publique publicamente",
    "Tutoriales exclusivos paso a paso sobre herramientas especificas de IA",
    "Comunidad privada de Discord con acceso directo a ti y networking con otros profesionales",
    "Consultas grupales mensuales donde respondes preguntas en vivo",
    "Newsletter semanal exclusivo con noticias curadas y analisis profundo de tendencias en IA",
    "Descargas exclusivas como guias en PDF, cheatsheets y listas de recursos verificados",
    "Descuentos en cursos o productos de tus colaboradores y afiliados"
]

for idea in premium_ideas:
    story.append(Paragraph(f"- {idea}", list_style))
    story.append(Spacer(1, 4))

story.append(Spacer(1, 15))
story.append(Paragraph("<b>Plataformas para vender contenido premium:</b>", heading2_style))

premium_platforms = [
    ("Gumroad", "gumroad.com", "Perfecto para productos digitales individuales como ebooks, cursos o templates. Facil de configurar."),
    ("Patreon", "patreon.com", "Ideal para membresias mensuales con contenido exclusivo continuo."),
    ("Substack", "substack.com", "Especializado en newsletters pagados. Muy popular para contenido escrito."),
    ("Teachable", "teachable.com", "Mejor para cursos completos con video y materiales descargables."),
    ("Hotmart", "hotmart.com", "Popular en hispanoamerica. Permite cursos, membresias y productos digitales.")
]

for name, url, desc in premium_platforms:
    story.append(Paragraph(f"<b>{name}</b> - {desc}", list_style))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# Section 5: Sponsorships
story.append(Paragraph("5. Patrocinios - Colaboraciones con Marcas", heading1_style))
story.append(Spacer(1, 15))

story.append(Paragraph("<b>Como conseguir patrocinadores?</b>", heading2_style))
story.append(Paragraph(
    "Los patrocinios son acuerdos donde las marcas te pagan por promocionar sus productos o servicios a tu audiencia. A diferencia de los afiliados, aqui recibes un pago fijo independientemente de las ventas que generes. Para conseguir patrocinadores, primero necesitas construir una audiencia y demostrar valor. Las marcas buscan creadores con engagement real, no solo numeros inflados.",
    body_style
))

story.append(Spacer(1, 15))
story.append(Paragraph("<b>Plataformas para conectar con marcas:</b>", heading2_style))

sponsor_platforms = [
    ("Influencer Marketing Hub", "influencermarketinghub.com", "Directorio y recursos para encontrar colaboraciones"),
    ("AspireIQ", "aspireiq.com", "Plataforma profesional de marketing de influencia"),
    ("GRIN", "grin.co", "Herramienta para gestionar relaciones con influencer"),
    ("Social Blade", "socialblade.com", "Analytics para demostrar tu crecimiento a marcas")
]

for name, url, desc in sponsor_platforms:
    story.append(Paragraph(f"- <b>{name}</b>: {desc}", list_style))
    story.append(Spacer(1, 4))

story.append(Spacer(1, 15))
story.append(Paragraph("<b>Consejos para conseguir tu primer patrocinador:</b>", heading2_style))

sponsor_tips = [
    "Construye primero - necesitas al menos 5,000-10,000 seguidores activos para ser atractivo",
    "Documenta todo - guarda capturas de tus estadisticas, engagement y comentarios positivos",
    "Crea un media kit - un PDF profesional con tu informacion, estadisticas y lo que ofreces",
    "Comienza pequeno - contacta startups y herramientas de IA emergentes que busquen exposicion",
    "Soy profesional - trata cada interaccion como una propuesta de negocios formal",
    "Cumple lo prometido - entrega mas de lo acordado para conseguir recompras"
]

for tip in sponsor_tips:
    story.append(Paragraph(f"- {tip}", list_style))
    story.append(Spacer(1, 4))

story.append(PageBreak())

# Section 6: Summary
story.append(Paragraph("6. Resumen y Plan de Accion", heading1_style))
story.append(Spacer(1, 15))

story.append(Paragraph("<b>Tu plan de monetizacion para los proximos 30 dias:</b>", heading2_style))

plan_data = [
    [Paragraph('<b>Semana</b>', header_style_tbl), Paragraph('<b>Acciones</b>', header_style_tbl), Paragraph('<b>Objetivo</b>', header_style_tbl)],
    [Paragraph('Semana 1', cell_style_tbl), Paragraph('Crear cuenta AdSense y Ko-fi', cell_style_tbl), Paragraph('Configurar bases', cell_style_tbl)],
    [Paragraph('Semana 2', cell_style_tbl), Paragraph('Registrarse en Amazon Associates', cell_style_tbl), Paragraph('Primeros links de afiliado', cell_style_tbl)],
    [Paragraph('Semana 3', cell_style_tbl), Paragraph('Completar perfil en todas las redes', cell_style_tbl), Paragraph('Aumentar trafico', cell_style_tbl)],
    [Paragraph('Semana 4', cell_style_tbl), Paragraph('Crear contenido premium basico', cell_style_tbl), Paragraph('Primera oferta de valor', cell_style_tbl)],
]

plan_table = Table(plan_data, colWidths=[3*cm, 6*cm, 4*cm])
plan_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#6366f1')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('FONTNAME', (0, 0), (-1, -1), 'SimHei'),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('BACKGROUND', (0, 1), (-1, -1), colors.white),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f5f5f5')]),
    ('TOPPADDING', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
]))
story.append(plan_table)

story.append(Spacer(1, 20))
story.append(Paragraph("<b>Links importantes para empezar:</b>", heading2_style))

links = [
    "Google AdSense: www.google.com/adsense",
    "Amazon Associates: affiliate-program.amazon.com",
    "Ko-fi: ko-fi.com",
    "Buy Me a Coffee: buymeacoffee.com",
    "Coursera Afiliados: about.coursera.org/affiliates",
    "Gumroad: gumroad.com"
]

for link in links:
    story.append(Paragraph(f"- {link}", list_style))
    story.append(Spacer(1, 4))

story.append(Spacer(1, 30))
story.append(Paragraph(
    "Tu Link Hub de MEG.IA ya esta preparado con todos los espacios necesarios para monetizar. Solo necesitas registrar tus cuentas, obtener tus enlaces y actualizarlos en la web. El exito viene con consistencia y valor real para tu audiencia.",
    highlight_style
))

# Build PDF
doc.build(story)
print("PDF generado exitosamente!")
