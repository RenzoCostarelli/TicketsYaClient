import MercadoPagoForm from "../mercado-pago-form/mercado-pago-form";

export default function Integraciones() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Integraciones
      </h1>
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Mercado Pago
      </h2>
      <div className="bg-gray-100 p-5 rounded">
        <MercadoPagoForm />
      </div>
    </>
  );
}
