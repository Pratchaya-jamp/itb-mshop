async function getItems(url, options = {}) {
  try {
    const { params } = options;

    // ประกอบ query string
    const query = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => query.append(key, v))
        } else if (value !== undefined && value !== null) {
          query.append(key, value)
        }
      });
    }

    const fullUrl = `${url}?${query.toString()}`

    const data = await fetch(fullUrl);

    if (!data.ok) {
      throw new Error(`HTTP error`);
    }

    const items = await data.json();
    return items;
  } catch (error) {
    throw new Error(`HTTP error`);
  }
}


async function getItemById(url, id) {
  try {
    //console.log(`🔍 Fetching from: ${url}/${id}`);

    const data = await fetch(`${url}/${id}`)

    if (!data.ok) {
      if (data.status === 404) return undefined;
      throw new Error(`HTTP error`);
    }

    const item = await data.json()
    return item
  } catch (error) {
    console.error("Error fetching item:", error);
    return undefined;
  }
}

async function deleteItemById(url, id) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    return res.status
  } catch (error) {
    throw new Error('can not delete your item')
  }
}

async function addItem(url, newItem, isMultipart = false) {
  try {
    const options = { method: 'POST' }

    if (isMultipart) {
      // newItem ต้องเป็น FormData
      options.body = newItem
    } else {
      options.headers = { 'Content-Type': 'application/json' }
      options.body = JSON.stringify(newItem)
    }

    const res = await fetch(url, options)
    const data = res.status !== 204 ? await res.json() : null
    return { status: res.status, data }
  } catch (error) {
    throw new Error('Cannot add your item: ' + error.message)
  }
}

async function editItem(url, id, updatedItem, isMultipart = false) {
  try {
    const options = {
      method: 'PUT',
      headers: {}
    }

    if (isMultipart) {
      // updatedItem เป็น FormData
      options.body = updatedItem
    } else {
      options.headers = { 'Content-Type': 'application/json' }
      options.body = JSON.stringify(updatedItem)
    }

    const res = await fetch(`${url}/${id}`, options)
    const data = res.status !== 204 ? await res.json() : null
    return { status: res.status, data }
  } catch (error) {
    throw new Error('Cannot edit your item: ' + error.message)
  }
}

async function patchItem(url, id, partialItem) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        ...partialItem
      })
    });

    if (!res.ok) {
      throw new Error('Failed to patch the item');
    }

    const patchedItem = await res.json();
    return patchedItem;
  } catch (error) {
    throw new Error('can not patch your item');
  }
}

export { getItems, getItemById, deleteItemById, addItem, editItem, patchItem }
