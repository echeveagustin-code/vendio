import os
import sys
import time
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.config import settings
from workers.fake_publisher import run_once


def main():
    interval_seconds = settings.FAKE_PUBLISHER_INTERVAL_SECONDS

    print("Worker loop fake publisher iniciado.")
    print(f"Intervalo: {interval_seconds} segundos")
    print("Presioná CTRL+C para detenerlo.")

    while True:
        try:
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            print("")
            print(f"[{now}] Ejecutando fake publisher...")

            run_once()

            print(f"[{now}] Ciclo finalizado. Próxima ejecución en {interval_seconds}s.")

        except KeyboardInterrupt:
            print("")
            print("Worker loop detenido manualmente.")
            break

        except Exception as error:
            print("")
            print("Error en worker loop:")
            print(error)
            print(f"Se reintentará en {interval_seconds}s.")

        time.sleep(interval_seconds)


if __name__ == "__main__":
    main()