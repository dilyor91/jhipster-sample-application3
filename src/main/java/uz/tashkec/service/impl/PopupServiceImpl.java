package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.Popup;
import uz.tashkec.repository.PopupRepository;
import uz.tashkec.service.PopupService;
import uz.tashkec.service.dto.PopupDTO;
import uz.tashkec.service.mapper.PopupMapper;

/**
 * Service Implementation for managing {@link Popup}.
 */
@Service
@Transactional
public class PopupServiceImpl implements PopupService {

    private final Logger log = LoggerFactory.getLogger(PopupServiceImpl.class);

    private final PopupRepository popupRepository;

    private final PopupMapper popupMapper;

    public PopupServiceImpl(PopupRepository popupRepository, PopupMapper popupMapper) {
        this.popupRepository = popupRepository;
        this.popupMapper = popupMapper;
    }

    @Override
    public PopupDTO save(PopupDTO popupDTO) {
        log.debug("Request to save Popup : {}", popupDTO);
        Popup popup = popupMapper.toEntity(popupDTO);
        popup = popupRepository.save(popup);
        return popupMapper.toDto(popup);
    }

    @Override
    public PopupDTO update(PopupDTO popupDTO) {
        log.debug("Request to update Popup : {}", popupDTO);
        Popup popup = popupMapper.toEntity(popupDTO);
        popup = popupRepository.save(popup);
        return popupMapper.toDto(popup);
    }

    @Override
    public Optional<PopupDTO> partialUpdate(PopupDTO popupDTO) {
        log.debug("Request to partially update Popup : {}", popupDTO);

        return popupRepository
            .findById(popupDTO.getId())
            .map(existingPopup -> {
                popupMapper.partialUpdate(existingPopup, popupDTO);

                return existingPopup;
            })
            .map(popupRepository::save)
            .map(popupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PopupDTO> findAll() {
        log.debug("Request to get all Popups");
        return popupRepository.findAll().stream().map(popupMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PopupDTO> findOne(Long id) {
        log.debug("Request to get Popup : {}", id);
        return popupRepository.findById(id).map(popupMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Popup : {}", id);
        popupRepository.deleteById(id);
    }
}
