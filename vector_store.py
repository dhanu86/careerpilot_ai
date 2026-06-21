from sentence_transformers import SentenceTransformer
import faiss

model = SentenceTransformer("all-MiniLM-L6-v2")

index = None
chunks = []

def build_index(text_chunks):

    global index
    global chunks

    chunks = text_chunks

    embeddings = model.encode(text_chunks)

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(embeddings)


def search(query):

    query_embedding = model.encode([query])

    distances, indices = index.search(
        query_embedding,
        1
    )

    return chunks[indices[0][0]]